export class Tile
{
    constructor(tileArr){
        this.state = tileArr;
    }

    flipTile(){
        let temp = this.state[0];
        tileArr[0] = this.state[1];
        this.state[1] = temp;
    }
}