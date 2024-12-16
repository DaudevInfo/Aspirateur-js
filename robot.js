class Robot {
    constructor (x, y, energie) {
        this.y = y
        this.x = x
        this.basex = x
        this.basey = y
        this.basey = y
        this.energie = energie
    }

    moveX(deltaX, map) {
        if ((this.x+deltaX >0) || ((this.x + deltaX) < map.width)) {
            this.x += deltaX
            this.energie -=1
            map.Clean(this.x,this.y)
            map.Visit(this.x,this.y)    
        }
         
        map.display();
        
      
    }

    moveY(deltaY, map) {
        if ((this.y+deltaY >0) || ((this.y + deltaY) < map.height)) {
            this.y += deltaY
            this.energie -=1
            map.Clean(this.x,this.y)
            map.Visit(this.x,this.y)    
        } 
        map.display();
    }

    goTopLeft(map) {
        while (this.y > 1 ) {
            this.moveY(-1, map)
        }
        while (this.x > 1) {
             this.moveX(-1, map)
        }  
        
    }
    goBottom(map)  {
        let destY = map.height
        console.log("destY avant" + destY)
        console.log("isvisted" + map.isLineVisited(destY))
        while (map.isLineVisited(destY)) destY--
        console.log("destY apres" + destY)
        while (this.y < destY) {
            this.moveY(1, map)
        }
    } 

    goTop(map) {
        let destY = 1
        while (map.isLineVisited(destY)) destY++
        while (this.y > destY) {
            this.moveY(-1, map)
        }
    }

    goRight(map) {
        let destX = map.width
        while (map.isColumnVisited(destX)) destX--
        while (this.x < destX) {
            this.moveX(1, map)
        }
    }
    goLeft(map) {
        let destX = 1
        while (map.isColumnVisited(destX)) destX++
        while (this.x > destX) {
            this.moveX(-1, map)
        }
    }

    cleanMap(map) {
        this.goTopLeft(map)

        while ((this.x != map.centerx) && (this.y != map.centery)) {
            this.goBottom(map)
            this.goRight(map)
            this.goTop(map)
            this.goLeft(map)
            map.toString()
        }
    }
}

export { Robot }