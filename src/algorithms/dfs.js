// let GraphNode = require('../dataStructures/GraphNode');
// let Queue = require('../dataStructures/Queue');
//let addChildrenToQueue = require('./addChildrenToQueue');
let copyObjects = require('./copyObjects').default;

let shouldContinueAdding = true

function dfs(mainGrid, startNode, endNode, numRows, numCols){
    let grid = copyObjects.copy2dArrayOfObjects(mainGrid);   

    let finalArray = []
    
    dfsHelper(grid, startNode, endNode, numRows, numCols, finalArray);

    console.log("Here")
    console.log(`Sending ${finalArray} back`)
    return finalArray;
}

function dfsHelper(grid, startNode, endNode, numRows, numCols, finalArray){
    
    if(startNode.row === endNode.row && startNode.col === endNode.col){                    
        console.log(`Reached destination at ${startNode.row},${startNode.col} sending this array back ${finalArray}`)
        shouldContinueAdding = false
        return;
    } 

    let children = getChildren(grid, startNode, numRows, numCols)    

    for(let index in children){
        //do something with element
        let child = children[index]
        if(shouldContinueAdding){
            finalArray.push(child)
        }

        dfsHelper(grid, child, endNode, numRows, numCols, finalArray);
    }

    return finalArray
}


function getChildren(grid, currentNode, numRows, numCols){  

    let {row, col} = currentNode;    

    let result = []

    /*
    ?   ---------------------------------------------------
    ?   |               Corner edge cases                 |
    ?   ---------------------------------------------------
    */
    //! top left corner
    if(row === 0 && col === 0) {            
        //right child
        if(!grid[row][col+1].visited && !grid[row][col+1].isWall && !grid[row][col+1].isWall){
            grid[row][col+1].visited = true;
            result.push(grid[row][col+1])
        }

        //bottom child
        if(!grid[row+1][col].visited && !grid[row+1][col].isWall){
            grid[row+1][col].visited = true;
            result.push(grid[row+1][col])    
        }
        return result;
    }
    //! top right corner
    else if(row === 0 && col === (numCols-1)){
        //bottom child
        if(!grid[row+1][col].visited && !grid[row+1][col].isWall){
            grid[row+1][col].visited = true;
            result.push(grid[row+1][col]) 
        }        

        //left child
        if(!grid[row][col-1].visited && !grid[row][col-1].isWall){
            grid[row][col-1].visited = true;
            result.push(grid[row][col-1]) 
        }        
        return result;
    }
    //! bottom right corner
    else if(row === (numRows-1) && col === (numCols-1)){
        //top child
        if(!grid[row-1][col].visited && !grid[row-1][col].isWall){
            grid[row-1][col].visited = true;
            result.push(grid[row-1][col]) 
        }        

        //left child
        if(!grid[row][col-1].visited && !grid[row][col-1].isWall){
            grid[row][col-1].visited = true;
            result.push(grid[row][col-1]) 
        }        
        return result;
    }
    //! bottom left corner
    else if(row === (numRows-1) && col === 0){
        //top child
        if(!grid[row-1][col].visited && !grid[row-1][col].isWall){
            grid[row-1][col].visited = true;
            result.push(grid[row-1][col]) 
        }        

        //right child
        if(!grid[row][col+1].visited && !grid[row][col+1].isWall){
            grid[row][col+1].visited = true;
            result.push(grid[row][col+1]) 
        }        
        return result;
    }
    /*
    ?   ---------------------------------------------------
    ?   |               Border edge cases                 |
    ?   ---------------------------------------------------
    */
    //! top border
    else if(row === 0){
        //right child
        if(!grid[row][col+1].visited && !grid[row][col+1].isWall){
            grid[row][col+1].visited = true;
            result.push(grid[row][col+1]) 
        }        

        //bottom child
        if(!grid[row+1][col].visited && !grid[row+1][col].isWall){
            grid[row+1][col].visited = true;
            result.push(grid[row+1][col]) 
        }
        
        //left child  
        if(!grid[row][col-1].visited && !grid[row][col-1].isWall){
            grid[row][col-1].visited = true;
            result.push(grid[row][col-1])            
        }        
        return result;
    }
    //! right border
    else if(col === numCols-1){
        //top child
        if(!grid[row-1][col].visited && !grid[row-1][col].isWall){
            grid[row-1][col].visited = true;
            result.push(grid[row-1][col]) 
        }
        //bottom child
        if(!grid[row+1][col].visited && !grid[row+1][col].isWall){
            grid[row+1][col].visited = true;
            result.push(grid[row+1][col]) 
        }
        
        //left child
        if(!grid[row][col-1].visited && !grid[row][col-1].isWall){
            grid[row][col-1].visited = true;
            result.push(grid[row][col-1])            
        }        
        
        return result;
    }
    //! bottom border
    else if(row === numRows-1){
        //top child
        if(!grid[row-1][col].visited && !grid[row-1][col].isWall){
            grid[row-1][col].visited = true;
            result.push(grid[row-1][col]) 
        }
        
        //right child
        if(!grid[row][col+1].visited && !grid[row][col+1].isWall){
            grid[row][col+1].visited = true;
            result.push(grid[row][col+1]) 
        }
        //left child
        if(!grid[row][col-1].visited && !grid[row][col-1].isWall){
            grid[row][col-1].visited = true;
            result.push(grid[row][col-1])            
        }     
        
        return result;
    }
    //! left border
    else if(col === 0){
        //top child
        if(!grid[row-1][col].visited && !grid[row-1][col].isWall){
            grid[row-1][col].visited = true;
            result.push(grid[row-1][col]) 
        }
        
        //right child
        if(!grid[row][col+1].visited && !grid[row][col+1].isWall){
            grid[row][col+1].visited = true;
            result.push(grid[row][col+1]) 
        } 
        
        //bottom child
        if(!grid[row+1][col].visited && !grid[row+1][col].isWall){
            grid[row+1][col].visited = true;
            result.push(grid[row+1][col]) 
        } 
        return result;
    } 
    /*
    ?   ---------------------------------------------------
    ?   |          General Node with 8 children           | 
    ?   ---------------------------------------------------
    */
    else {
        //top child
        if(!grid[row-1][col].visited && !grid[row-1][col].isWall){
            grid[row-1][col].visited = true;
            result.push(grid[row-1][col]) 
        }                

        //right child
        if(!grid[row][col+1].visited && !grid[row][col+1].isWall){
            grid[row][col+1].visited = true;
            result.push(grid[row][col+1]) 
        }         

        //bottom child
        if(!grid[row+1][col].visited && !grid[row+1][col].isWall){
            grid[row+1][col].visited = true;
            result.push(grid[row+1][col]) 
        }         

        //left child
        if(!grid[row][col-1].visited && !grid[row][col-1].isWall){
            grid[row][col-1].visited = true;
            result.push(grid[row][col-1])            
        }
    }   

    return result;
}

export default dfs;