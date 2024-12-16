let roomMap = null

function initGame() {

    let width = document.getElementById("width").value
    let height = document.getElementById("height").value
    let dirtyCell = document.getElementById("dirtyCell").value

    roomMap = new RoomMap(width, height)
    roomMap.dirtyBoard(dirtyCell)
    roomMap.display()
}

function Go() {

    let x = document.getElementById("X").value
    let y = document.getElementById("Y").value
    let energie = document.getElementById("energie").value
    
    let robot = new Robot(+x, +y, energie)
    console.log(x+ " " + y + " " + energie)
    robot.cleanMap(roomMap)
    
}

class RoomMap {
    constructor (width, height) {
        this.width = width
        this.height = height
        this.centerx = Math.floor(width/2)
        this.centery = Math.floor(height/2)
        this.board = []
        this.initBoard()
       
    }
    initBoard() {
        for (let x = 1; x <= this.width; x++) {
            for (let y = 1; y <= this.height; y++) {
                this.board.push({ x: x, y: y, value: [" ", " "] })
                this.createCard(x,y)
            }
        }

    }

    getCell(x, y) {
        return this.board.find(cell => cell.x === x && cell.y === y);
    }

    isClean(x, y) {
        const cell = this.getCell(x, y);
        return cell && cell.value[0] === " ";
    }

    isDirty(x,y) {
        const cell = this.getCell(x,y);
        return cell && cell.value[0] === "X";
    }

    Clean(x,y) {
        const cell = this.getCell(x, y);
        if (cell) {
            cell.value[0] = " ";
            cell.value[2].style.backgroundColor = "white"
        }
    }

    Dirty(x, y) {
        const cell = this.getCell(x,y);
        if (cell) {
            cell.value[0] = "X"
            cell.value[2].style.backgroundColor =  "black"
        }
    }

    Visit(x, y) {
        const cell = this.getCell(x, y)
        if (cell) {
            cell.value[1] = "V"
            cell.value[2].style.backgroundColor =  "red"

        }
    }

    isLineVisited(y) {
        let tab = this.board.filter(cell => cell.y === y)
    
        let ret = tab.filter((cell) => cell.value[1] === " ")
        if (ret.length === 0) {
            return true 
        }
        return false
    }

    isColumnVisited(x) {
        let tab = this.board.filter(cell => cell.x === x)
        let ret = tab.filter((cell) => cell.value[1] === " ")
        if (ret.length === 0) {
            return true
        }
        return false
    }



    dirtyBoard(nbToClean) {
        while (nbToClean > 0) {
            while (true) {
                let x = Math.floor(Math.random() * this.width + 1);
                let y = Math.floor(Math.random() * this.height + 1);
                if (this.isClean(x, y)) {
                    this.Dirty(x, y);
                    break;
                }
            }
            nbToClean--;
        }
    }

    display() {
        const lines = Array.from({ length: this.height }, (_, y) => {
            return "|" + Array.from({ length: this.width }, (_, x) => {
                const cell = this.getCell(x + 1, y + 1);
                return cell.value.join("");
            }).join("|") + "|";
        });
    }
   

    createCard(x,y) {
        let room = document.getElementById ("RoomMap")
        let card = document.createElement("div")
        card.style.width = "25px"
        card.style.height = "25px"
        card.style.border = "1px solid black"
        card.style.position = "absolute"
        card.style.left = 50+x*25 + "px"
        card.style.top = 250+y*25 + "px"
        room.appendChild(card)
        let cell = this.getCell(x, y)
        cell.value.push(card)
    }


}


class Robot {
    constructor  (x, y, energie) {
        this.y = y
        this.x = x
        this.basex = x
        this.basey = y
        this.energie = energie
    }

    moveX(deltaX, map) {

            console.log("X :" + this.x+ "delta"+ deltaX + "map.width" + map.width)
            this.x = deltaX + this.x
            this.energie -=1
            map.Clean(this.x,this.y)
            map.Visit(this.x,this.y)    
      
    }

    moveY(deltaY, map) {
            console.log("Y :" + this.y+ "delta"+ deltaY + "map.height" + map.height)
            this.y = this.y + deltaY
            this.energie -=1
            map.Clean(this.x,this.y)
            map.Visit(this.x,this.y)    
        

    }

    goTopLeft(map) {
        while (this.y > 1 ) {
            this.moveY(-1, map)
            console.log("dans goTopLeft y:"+ this.y)
        }
        while (this.x > 1) {
             this.moveX(-1, map)
                console.log("dans goTopLeft x:"+ this.x)
        }  
        
    }
    goBottom(map)  {
        console.log("goBottom"+ this.y + " " + map.height)
        let destY = map.height
        
        while (map.isLineVisited(destY)) destY--
 
        while (this.y <= destY) {
            this.moveY(1, map)
        }
        console.log("goBottom sortie "+ this.y + " " + destY)
    } 

    goTop(map) {
        let destY = 1
        while (map.isLineVisited(destY)) destY++
        while (this.y >= destY) {
            this.moveY(-1, map)
        }
    }

    goRight(map) {
        let destX = map.width
        while (map.isColumnVisited(destX)) destX--
        while (this.x <= destX) {
            this.moveX(1, map)
        }
    }
    goLeft(map) {
        let destX = 1
        while (map.isColumnVisited(destX)) destX++
        while (this.x >= destX) {
            this.moveX(-1, map)
        }
    }

    cleanMap(map) {
        console.log("cleanMap")
        console.log(this.x + " " + this.y + " " + map.centerx + " " + map.centery)
        this.goTopLeft(map)
        console.log("apres top left "+ this.x + " " + this.y + " " + map.centerx + " " + map.centery)
        this.goBottom(map)
        this.goRight(map)
        this.goTop(map)

        // Ca plante ici il ne va nulle part à droite
        this.goLeft(map)
    //     while ((this.x != map.centerx) && (this.y != map.centery)) {
    //         console.log("goBottom")
    //         this.goBottom(map)
    //         console.log("goRight")
    //         this.goRight(map)
    //         console.log("goTop")
    //         this.goTop(map)
    //         console.log("goLeft")
    //         this.goLeft(map)
    //         console.log(this.x + " " + this.y + " " + map.centerx + " " + map.centery)

    //    }
    }
}

