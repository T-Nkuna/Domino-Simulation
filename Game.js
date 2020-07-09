import {GameBoard} from "./GameBoard.js";
export class Game{
    constructor(){
        this.gameBoard = new GameBoard();
        //allocate players seven random tilePositions
        this.player1TilePositions = this.gameBoard.assignTiles();
        this.player2TilePositions = this.gameBoard.assignTilesEx(this.player1TilePositions);
        //randomly select a tile position to initiate game
        let randomTilePosition = Math.floor((Math.random()*100)%Object.keys(this.gameBoard.unassignedTilePositions).length);
        let firstTile = this.gameBoard.stock[this.gameBoard.unassignedTilePositions.splice(randomTilePosition,1)];
        this.gameBoard.gameState.push(firstTile);
        this.printMessage("Game starting with first tile: "+JSON.stringify(firstTile));
        //

    }


    initiateGameSimulation(){

        let playTurn = 0;
        let playersTilePositions = [this.player1TilePositions,this.player2TilePositions];
        
        let interval = setInterval(()=>{
            
            if(this.gameBoard.unassignedTilePositions.length==0){
                clearInterval(interval);
                //compute game results
                if(this.player1TilePositions.length<this.player2TilePositions.length){
                    this.printMessage("<b>Player Alice has won!</b>");
                }
                else if(this.player2TilePositions.length<this.player1TilePositions.length)
                {
                    this.printMessage("<b>Player Bob has won!</b>");
                }
                else
                {
                    this.printMessage("<b>Game Over!</b>");
                }
                
            }
            let playedPositions = playTurn===0?this.player1TilePositions:this.player2TilePositions;
            while(!this.playTile(playedPositions,playTurn) && this.gameBoard.unassignedTilePositions.length>0){
                let drawnTilePosition = this.gameBoard.unassignedTilePositions.pop()
                let message = playTurn ==0?"Alice can't play, drawing ":"Bob can't play, drawing ";
                message+=JSON.stringify(this.gameBoard.stock[drawnTilePosition]);
                this.printMessage(message);
                playedPositions.push(drawnTilePosition);
            }

            playTurn = (playTurn+1)%2

        },1000);
    }

    playTile(tilePositions,playTurn){
        let oldPositions = tilePositions.map(pos=>pos);
        let playResults =  this.gameBoard.playTile(tilePositions);
        if(playTurn==0)
        {
            this.player1TilePositions = playResults.updatedTilePositions;
        }
        else
        {
            this.player2TilePositions =playResults.updatedTilePositions;
        }
       
        let played = playTurn===0?this.player1TilePositions.length !== oldPositions.length:this.player2TilePositions.length!==oldPositions.length;
        if(played){
            let message = playTurn==0?"Alice plays ":"Bob plays ";
            message+=JSON.stringify(playResults.playedTile);
            this.printMessage(message);
            this.printMessage("Board is now: "+JSON.stringify(this.gameBoard.gameState));

        }
        return played;
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

    printMessage(message){
        let messageContainer = document.createElement("div");
        messageContainer.innerHTML = message;
        document.querySelector("#gameLog").appendChild(messageContainer);
    }


}