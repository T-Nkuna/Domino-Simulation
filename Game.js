import {GameBoard} from "./GameBoard.js";
export class Game{
    constructor(){
        this.gameBoard = new GameBoard();
        //allocate players seven random tilePositions
        this.player1TilePositions = this.gameBoard.assignTiles();
        this.player2TilePositions = this.gameBoard.assignTilesEx(this.player1TilePositions);
        //randomly select a tile position to initiate game
        let randomTilePosition = Math.floor((Math.random()*100)%Object.keys(this.gameBoard.unassignedTilePositions).length);
        this.gameBoard.gameState.push(this.gameBoard.stock[this.gameBoard.unassignedTilePositions.splice(randomTilePosition,1)]);

    }


    initiateGameSimulation(){

        let playTurn = 0;
        let playersTilePositions = [this.player1TilePositions,this.player2TilePositions];
        
        let interval = setInterval(()=>{
            
            if(this.gameBoard.unassignedTilePositions.length==0){
                clearInterval(interval);
            }

            while(!this.playTile(playersTilePositions[playTurn],playTurn) && this.gameBoard.unassignedTilePositions.length>0){
                playersTilePositions[playTurn].push(this.gameBoard.unassignedTilePositions.pop())
            }

            playTurn = (playTurn+1)%2

        },3000);
    }

    playTile(tilePositions,playTurn){
        let oldPositions = tilePositions.map(pos=>pos);
        if(playTurn==0)
        {
            this.player1TilePositions = this.gameBoard.playTile(tilePositions);
        }
        else
        {
            this.player2TilePositions =this.gameBoard.playTile(tilePositions);
        }
        console.log(this.gameBoard.gameState);
        console.log(this.player1Tiles);
        console.log(this.player2Tiles);
        console.log(this.unassignedTiles);
        return playTurn===0?this.player1TilePositions.length !== oldPositions.length:this.player2TilePositions.length!==oldPositions.length;
    }

    get player1Tiles(){
        return this.player1TilePositions.map(pos=>this.gameBoard.stock[pos]);
    }

    get player2Tiles(){
        return this.player2TilePositions.map(pos=>this.gameBoard.stock[pos]);
    }

    get unassignedTiles(){
        return this.gameBoard.unassignedTilePositions.map(pos=>this.gameBoard.stock[pos]);
    }


}