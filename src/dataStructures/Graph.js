let GraphNode = require('./GraphNode').default;

class Graph {
    constructor(numRow, numCol){
        this.grid = [];
        this.numRow = numRow;
        this.numCol = numCol;
        this.setDefaultGrid();
    }

    setDefaultGrid(){        
        for(let i = 0; i < this.numRow; i++){
            let row = [];
            for(let j = 0; j < this.numCol; j++){
                row.push(new GraphNode("<node>",i,j));
                //row.push(0);
            }
            this.grid.push(row);
        }
    }

    printGrid(){    
        console.log();
        for(let i = 0; i < this.numRow; i++){            
            for(let j = 0; j < this.numCol; j++){
                console.log(`${this.grid[i][j].value}(${i},${j}) `);
                //process.stdout.write(`${this.grid[i][j].value}(${i},${j}) `);                
            }            
            console.log();
        }
        console.log();
    }
}

// module.exports = Graph;
export default Graph;