
//import map from './map.js'

//import { RoomMap } from "./map"
const RoomMap = require("./map.js");

function initGame() {
    console.log("hello")
   
    
    let width = document.getElementById("width").value
    let height = document.getElementById("height").value
    let dirtyCell = document.getElementById("dirtyCell").value
    console.log("coucou")
    console.log (width+" " +height+" " + dirtyCell)
    let roomMap = new RoomMap(width, height)
}