import {GameBoard} from "./GameBoard.js";

let gBoard = new GameBoard();
console.log(gBoard.stock);
console.log(gBoard.unassignedTilePositions);

let p1TilePositions  = gBoard.assignTiles(); //allocated seven tile positions to player 1
let p2TilePositions = gBoard.assignTilesEx(p1TilePositions); //allocate seven tile positions to player 2
console.log(p1TilePositions);
console.log(p2TilePositions);
console.log(gBoard.unassignedTilePositions);
console.log(gBoard.stock[gBoard.unassignedTilePositions.pop()]);
console.log(gBoard.unassignedTilePositions);
console.log(gBoard.hasIdenticalEndPoints([9,9],[1,0]));

