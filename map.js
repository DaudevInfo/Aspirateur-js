
class RoomMap {
    constructor (width, height) {
        this.width = width
        this.height = height
        this.centerx = Math.floor(width/2)+1
        this.centery = Math.floor(height/2)+1
        this.board = []
        this.initBoard()
       
    }
    initBoard() {
        for (let x = 1; x <= this.width; x++) {
            for (let y = 1; y <= this.height; y++) {
                this.board.push({ x: x, y: y, value: [" ", " "] });
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
        }
    }

    Dirty(x, y) {
        const cell = this.getCell(x,y);
        if (cell) {
            cell.value[0] = "X"
        }
    }

    Visit(x, y) {
        const cell = this.getCell(x, y)
        if (cell) {
            cell.value[1] = "V"
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
                console.log("X" + x + "Y" + y);
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

        toString()
        {

            for (let i=1; i<=this.width; i++)
                for(let j=1; j<=this.height; j++)
                    console.log("i :"+i+" j:"+j+ "valeur :"+this.getCell(i,j).value[1])
        }
        console.log(lines.join("\n"));
    }
}




export { RoomMap }