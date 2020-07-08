import {GameBoard} from "./GameBoard.js";

let gBoard = new GameBoard();
console.log(gBoard.stock);
console.log(gBoard.unassignedTilePositions);

let p1TilePositions  = gBoard.assignTiles(); //allocated seven tile positions to player 1
let p2TilePositions = gBoard.assignTilesEx(p1TilePositions); //allocate seven tile positions to player 2
console.log(p1TilePositions.map(pos=>gBoard.stock[pos]));
console.log(p2TilePositions.map(pos=>gBoard.stock[pos]));
console.log(gBoard.unassignedTilePositions);
gBoard.gameState.push(gBoard.stock[gBoard.unassignedTilePositions.pop()]);
console.log(gBoard.gameState);
console.log(gBoard.unassignedTilePositions);
console.log(gBoard.hasIdenticalEndPoints([9,9],[1,0]));
console.log(gBoard.validTileExists(p1TilePositions));
console.log(gBoard.validTileExists(p2TilePositions));
console.log(gBoard.playTile(p1TilePositions));
console.log(gBoard.playTile(p2TilePositions));
console.log(p1TilePositions);
console.log(p2TilePositions);
console.log(gBoard.gameState);

