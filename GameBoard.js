import {Tile} from "./Tile.js"
export class GameBoard{


    constructor(){
        this.stock = this.createGameBoard(); //collection of all 28 tiles
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
          gameBoard =  gameBoard.concat(Tiles(rowIndex));
        }
        return gameBoard;
    }

    

        //returns seven randomly generated indexes within the range 0-28
        assignTiles()
        {
            let indices = [];
            while(indices.length<7){
                let pickedIndex =Math.floor((Math.random()*100)%29);
                if(indices.indexOf(pickedIndex)<0)
                {
                    indices.push(pickedIndex);
                }
            }
            return indices;
        }

        //generates 7 random intergers within the range 0 -28 excluding
        //integers specified in $excludedIndexes
        assignTilesEx(excludedIndexes)
        {
            let indices = [];
            while(indices.length<7){
                let pickedIndex =Math.floor((Math.random()*100)%29);
                if(indices.indexOf(pickedIndex)<0 && excludedIndexes.indexOf(pickedIndex)<0)
                {
                    indices.push(pickedIndex);
                }
            }
            return indices;
        }

}