
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
            tiles.push([rowIndex,counter]);
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

    //attempts to play a tile from tilePositions and returns an updated version of tilePositions 
    playTile(tilePositions){
        let checkValidPosition = this.validTileExists(tilePositions);
        if(checkValidPosition.positionToPlay!==-1){
            
            let tileToPlay = this.stock[checkValidPosition.positionToPlay];
           
            if(checkValidPosition.isLastEnd && checkValidPosition.isFirstEnd)
            {
                
                let prepended = this.prependToGameState(tileToPlay);
                if(prepended){
                    tilePositions = tilePositions.filter(pos=>pos!=checkValidPosition.positionToPlay);
                }

                if(!prepended && this.appendToGameState(tileToPlay)){
                    tilePositions = tilePositions.filter(pos=>pos!=checkValidPosition.positionToPlay);
                }
               
            }
            else if(checkValidPosition.isLastEnd)
            {
                 if(this.appendToGameState(tileToPlay)){
                    tilePositions = tilePositions.filter(pos=>pos!=checkValidPosition.positionToPlay);
                 }
                
                //prepend tile to gameState
            }
            else if(checkValidPosition.isFirstEnd)
            {
                if(this.prependToGameState(tileToPlay)){
                    tilePositions = tilePositions.filter(pos=>pos!=checkValidPosition.positionToPlay);
                 }
            }
        }

        return tilePositions;
    }
 
    /*checks whether a valid tile which can be played exists within tilePositions
     and returns and object which specifies the positionToPlay and a property that
     determines at which end of the game state should the position be played 
     if positionToPlay equals -1; then no valid position exists.
    */
    validTileExists(tilePositions){
        let positionToPlay = -1;
        let isLastEnd = true;
        let isFirstEnd = false;
        if(this.gameState.length>=0)
        {
            //checking both ends of the game state for a valid position to play
            let firstEnd = this.gameState[0];
            let lastEnd = this.gameState[this.gameState.length-1];
            for(let tilePosition of tilePositions)
            {
                let firstEndIsIdentical = this.hasIdenticalEndPoints(this.stock[tilePosition],firstEnd);
                let lastEndIsIdentical = this.hasIdenticalEndPoints(this.stock[tilePosition],lastEnd);
                if(firstEndIsIdentical || lastEndIsIdentical)
                {
                    positionToPlay = tilePosition;
                    isLastEnd = lastEndIsIdentical;
                    isFirstEnd = firstEndIsIdentical;
                    break;
                }
            }

        }

        return ({positionToPlay,isLastEnd,isFirstEnd});
    }

    //Determines wheter tileArr1 and tileArr2 have identical endpoints
    //computes the intersection of tileArr1 and tileArr2
    hasIdenticalEndPoints(tileArr1,tileArr2){
        return (tileArr1.filter(endPoint=>{
            return tileArr2.indexOf(endPoint)!=-1;
        }).length>0);
    }
    //determines whether the intersection occures at similar indices
    hasEquivalentEndPoints(tileArr1,tileArr2)
    {
        return this.hasIdenticalEndPoints(tileArr1,tileArr2) && (tileArr1[0]===tileArr2[0] || tileArr1[1]===tileArr2[1]);
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

        //attempts to append tileArr to gameState if it is valid;
        //returns true on success otherwise returns false
        appendToGameState(tileArr){
            let appended=false;
            let relativeToTile = this.gameState[this.gameState.length-1];
            if(relativeToTile[1]==tileArr[0]){
                this.gameState.push(tileArr);
                appended =true;
            }
            else if(relativeToTile[1] ==this.flipTile(tileArr.map(x=>x))[0])
            {
               // this.gameState.push(this.flipTile(tileArr.map(x=>x)));
                //appended =true;
            }
            return appended;
        }

        //attempts to prepend tileArr1 to gameState;
        //returns true on success otherwise returns false
        prependToGameState(tileArr){
            let prepended = false;
            let relativeToTile = this.gameState[0];
            if(relativeToTile[0]==tileArr[1])
            {
                this.gameState.unshift(tileArr);
                prepended = true;
            }
            else if(relativeToTile[0]==this.flipTile(tileArr.map(x=>x))[1])
            {
               // this.gameState.unshift(this.flipTile(tileArr.map(x=>x)));
               // prepended =true;
            }

            return prepended;
        }

}