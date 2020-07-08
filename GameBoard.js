
export class GameBoard{


    constructor(){
        this.stock = this.createGameBoard(); //collection of all 28 tiles
        this.unassignedTilePositions = Object.keys(this.stock).map(strNum=>parseInt(strNum));
        this.gameState = []; //keeps track of the state of the game
    }


    //Generates tiles per row
    Tiles(rowIndex){
        let counter = 0;
        let tiles = [];
        while(counter<rowIndex+1)
        {
            tiles.push([counter,rowIndex]);
            counter+=1;
        }
        return tiles;
    }


    //Generates an unshuffled stock
    createGameBoard(){
        let rowCount =7;
        let rowIndex =0;
        let gameBoard = [];
        for(rowIndex;rowIndex<rowCount;rowIndex++)
        {
          gameBoard =  gameBoard.concat(this.Tiles(rowIndex));
        }
        return gameBoard;
    }

    //attempts to play a tile from tilePositions
    playTile(tilePositions){

    }
 
    /*checks whether a valid tile which can be played exists within tilePositions
     and returns and object which specifies the positionToPlay and a property that
     determines at which end of the game state should the position be played 
     if positionToPlay equals -1; then no valid position exists.
    */
    validTileExists(tilePositions){
        let positionToPlay = -1;
        let isLastEnd = true;
        if(this.gameState.length>2)
        {
            //checking both ends of the game state for a valid position to play
            let firstEnd = this.gameState[0];
            let lastEnd = this.gameState[this.gameState.length-1];
            for(let tilePosition of tilePositions)
            {
                let firstEndIsIdentical = this.hasIdenticalEndPoints(this.stock[tilePosition],firstEnd);
                let lastEndIsIdentical = this.hasIdenticalEndPoints(this.stock[tilePositions],lastEnd);
                if(firstEndIsIdentical || lastEndIsIdentical)
                {
                    positionToPlay = tilePosition;
                    isLastEnd = lastEndIsIdentical;
                    break;
                }
            }

        }
        else if(this.gameState.lengh==1){
            
            for(let tilePosition of tilePositions)
            {
                if(this.hasIdenticalEndPoints(this.stock[tilePosition],this.gameState[0]))
                {
                    positionToPlay = tilePosition;
                    break;
                }
            }
        }

        return ({positionToPlay,isLastEnd});
    }

    //Determines wheter tileArr1 and tileArr2 have identical endpoints
    hasIdenticalEndPoints(tileArr1,tileArr2){
        return (tileArr1.filter(endPoint=>{
            return tileArr2.indexOf(endPoint)!=-1;
        }).length>0);
    }
    

        //returns seven randomly generated indexes within the range 0-27
        assignTiles()
        {
            let indices = [];
            while(indices.length<7){
                let pickedIndex =Math.floor((Math.random()*100)%28);
                if(indices.indexOf(pickedIndex)<0)
                {
                    indices.push(pickedIndex);
                }
            }

            this.unassignedTilePositions = this.unassignedTilePositions.filter(pos=>indices.indexOf(pos)<0);
            return indices;
        }

        //generates 7 random intergers within the range 0 -27 excluding
        //integers specified in $excludedIndexes
        assignTilesEx(excludedIndexes)
        {
            let indices = [];
            while(indices.length<7){
                let pickedIndex =Math.floor((Math.random()*100)%28);
                if(indices.indexOf(pickedIndex)<0 && excludedIndexes.indexOf(pickedIndex)<0)
                {
                    indices.push(pickedIndex);
                }
            }
            this.unassignedTilePositions = this.unassignedTilePositions.filter(pos=>indices.indexOf(pos)<0);
            return indices;
        }

        flipTile(tileArr){
            let temp = tileArr[0];
            tileArr[0] = tileArr[1];
            tileArr[1] = temp;
            return tileArr;
        }

}