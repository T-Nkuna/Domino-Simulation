


//Generates tiles per row
function Tiles(rowIndex){
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

function createGameBoard(){
    let rowCount =7;
    let rowIndex =0;
    let gameBoard = [];
    for(rowIndex;rowIndex<rowCount;rowIndex++)
    {
     gameBoard =  gameBoard.concat(Tiles(rowIndex));
    }
    return gameBoard;
}
function flipTile(tileArr){
    let temp = tileArr[0];
    tileArr[0] = tileArr[1];
    tileArr[1] = temp;
    return tileArr;
}

//returns seven randomly generated indexes within the range 0-28
function assignTiles()
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
function assignTilesEx(excludedIndexes)
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

let gBoard = createGameBoard();
p1Collection = assignTiles(); //allocate seven random indices to player 1
p2Collection = assignTilesEx(p1Collection); //allocate seven random indices to player 2
console.log(JSON.stringify(gBoard));
console.log(p1Collection);
console.log(p2Collection);