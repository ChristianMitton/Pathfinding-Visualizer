let Queue = require('../dataStructures/Queue').default;
//let addChildrenToQueue = require('./addChildrenToQueue')
let copyObjects = require('./copyObjects').default;

function bfs(mainGrid, startNode, endNode, numRows, numCols){    
    console.log(`Start Node: row:${startNode.row} col:${startNode.col}`);
    console.log(`End Node: row:${endNode.row} col:${endNode.col}`);
    console.log();
    let queue = new Queue();

    //console.log(`Here is the main grid after splicing: ${mainGrid}`);
    //let grid = [...mainGrid];
    let grid = copyObjects.copy2dArrayOfObjects(mainGrid);
    
    //console.log(`Here is the temp grid after splicing: ${grid}`);

    let visitedNodes = [];    
    
    grid[startNode.row][startNode.col].visited = true;

    queue.enqueue(startNode);   

    while(!queue.isEmpty()){
        let currentNode = queue.dequeue();        
        // append current node to visited array
        visitedNodes.push(currentNode);

        let {row, col} = currentNode;        

        //console.log(`currentNode: <node>(${row},${col})`);

        if(row === endNode.row && col === endNode.col){            
            console.log("Reached destination");
            return visitedNodes;
        }
        
        addChildrenToQueue(grid, currentNode, queue, numRows, numCols); 

        //process.stdout.write("Queue contents after adding children:");
        //queue.printGraphQueue();
    }

    console.log("Did not reach destination");
    return visitedNodes;
}

function addChildrenToQueue(grid, currentNode, queue, numRows, numCols){    
            
        // console.log("...")
        // console.log(`About to assign ${currentNode}, ${currentNode}`)

        let {row, col} = currentNode;    

        // console.log(`Here is the row, col ${row}, ${col}`)


    /*
    ?   ---------------------------------------------------
    ?   |               Corner edge cases                 |
    ?   ---------------------------------------------------
    */
    //! top left corner
    if(row === 0 && col === 0) {            
        //right child
        if(!grid[row][col+1].visited){
            grid[row][col+1].visited = true;
            queue.enqueue(grid[row][col+1])
        }

        //bottom child
        if(!grid[row+1][col].visited){
            grid[row+1][col].visited = true;
            queue.enqueue(grid[row+1][col])    
        }
        return;             
    }
    //! top right corner
    else if(row === 0 && col === (numCols-1)){
        //bottom child
        if(!grid[row+1][col].visited){
            grid[row+1][col].visited = true;
            queue.enqueue(grid[row+1][col]) 
        }        

        //left child
        if(!grid[row][col-1].visited){
            grid[row][col-1].visited = true;
            queue.enqueue(grid[row][col-1]) 
        }        
        return;
    }
    //! bottom right corner
    else if(row === (numRows-1) && col === (numCols-1)){
        //top child
        if(!grid[row-1][col].visited){
            grid[row-1][col].visited = true;
            queue.enqueue(grid[row-1][col]) 
        }        

        //left child
        if(!grid[row][col-1].visited){
            grid[row][col-1].visited = true;
            queue.enqueue(grid[row][col-1]) 
        }        
        return;
    }
    //! bottom left corner
    else if(row === (numRows-1) && col === 0){
        //top child
        if(!grid[row-1][col].visited){
            grid[row-1][col].visited = true;
            queue.enqueue(grid[row-1][col]) 
        }        

        //right child
        if(!grid[row][col+1].visited){
            grid[row][col+1].visited = true;
            queue.enqueue(grid[row][col+1]) 
        }        
        return;
    }
    /*
    ?   ---------------------------------------------------
    ?   |               Border edge cases                 |
    ?   ---------------------------------------------------
    */
    //! top border
    else if(row === 0){
        //right child
        if(!grid[row][col+1].visited){
            grid[row][col+1].visited = true;
            queue.enqueue(grid[row][col+1]) 
        }        

        //bottom child
        if(!grid[row+1][col].visited){
            grid[row+1][col].visited = true;
            queue.enqueue(grid[row+1][col]) 
        }
        
        //left child  
        if(!grid[row][col-1].visited){
            grid[row][col-1].visited = true;
            queue.enqueue(grid[row][col-1])            
        }        
        return;
    }
    //! right border
    else if(col === numCols-1){
        //top child
        if(!grid[row-1][col].visited){
            grid[row-1][col].visited = true;
            queue.enqueue(grid[row-1][col]) 
        }
        //bottom child
        if(!grid[row+1][col].visited){
            grid[row+1][col].visited = true;
            queue.enqueue(grid[row+1][col]) 
        }
        
        //left child
        if(!grid[row][col-1].visited){
            grid[row][col-1].visited = true;
            queue.enqueue(grid[row][col-1])            
        }        
        
        return;
    }
    //! bottom border
    else if(row === numRows-1){
        //top child
        if(!grid[row-1][col].visited){
            grid[row-1][col].visited = true;
            queue.enqueue(grid[row-1][col]) 
        }
        
        //right child
        if(!grid[row][col+1].visited){
            grid[row][col+1].visited = true;
            queue.enqueue(grid[row][col+1]) 
        }
        //left child
        if(!grid[row][col-1].visited){
            grid[row][col-1].visited = true;
            queue.enqueue(grid[row][col-1])            
        }     
        
        return;
    }
    //! left border
    else if(col === 0){
        //top child
        if(!grid[row-1][col].visited){
            grid[row-1][col].visited = true;
            queue.enqueue(grid[row-1][col]) 
        }
        
        //right child
        if(!grid[row][col+1].visited){
            grid[row][col+1].visited = true;
            queue.enqueue(grid[row][col+1]) 
        } 
        
        //bottom child
        if(!grid[row+1][col].visited){
            grid[row+1][col].visited = true;
            queue.enqueue(grid[row+1][col]) 
        } 
        return;
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
            queue.enqueue(grid[row-1][col]) 
        }                

        //right child
        if(!grid[row][col+1].visited && !grid[row][col+1].isWall){
            grid[row][col+1].visited = true;
            queue.enqueue(grid[row][col+1]) 
        }         

        //bottom child
        if(!grid[row+1][col].visited && !grid[row+1][col].isWall){
            grid[row+1][col].visited = true;
            queue.enqueue(grid[row+1][col]) 
        }         

        //left child
        if(!grid[row][col-1].visited && !grid[row][col-1].isWall){
            grid[row][col-1].visited = true;
            queue.enqueue(grid[row][col-1])            
        }
    }   

return;
}


//export default bfs;
export default bfs;