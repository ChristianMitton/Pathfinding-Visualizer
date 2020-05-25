let copyObjects = require('../copyObjects').default;

//Pick random number between 1 and 4: Math.floor(Math.random()*4)

function generateMaze(mainGrid, numRows, numCols){
    // let initialCell    
    let grid = copyObjects.copy2dArrayOfObjects(mainGrid);
    let stack = []
    let result = []

    // 1. Choose initial node, mark it as visited, and push it to stack
    let initialNode = grid[0][0];    
    initialNode.visited = true;
    stack.push(initialNode)

    // 2. While stack is not empty
    while(stack.length > 0){
        console.log('in')
        // 2.1 pop node from stack, make it current node        
        let currentNode = stack.pop()

        // console.log(`(${currentNode.row},${currentNode.col})`)

        let neighbors = getNeighbors(grid, currentNode, numRows, numCols)

        // console.log(`==> ${neighbors}`)

        // 2.2 if the node has any neighbours which have not been visited
        if(hasUnVisitedNodes(neighbors)){
            //console.log('in')
            // 2.2.1 Push current node to stack
            stack.push(currentNode)

            // 2.2.2 Choose one of the unvisited neighbors
            let unvisitedNeighbors = getUnvisitedNeighbors(neighbors);
            let numUnvisitedNeighbors = unvisitedNeighbors.length
            let randomNeighbor = neighbors[Math.floor(Math.random()*numUnvisitedNeighbors)]

            // TODO 2.2.3 Remove the wall between the current cell and the chosen cell
            currentNode.isWall = false;
            randomNeighbor.isWall = false;

            // 2.2.4 Mark the chosen cell as visited and push it to the stack
            randomNeighbor.visited = true;
            stack.push(randomNeighbor)
            result.push(randomNeighbor)

        }

    }

    // console.log(`This is result from generateMaze: ${result}`)
    return result;

}

function getNeighbors(grid, currentNode, numRows, numCols){

    let {row, col} = currentNode;    
    let result = [];

    /*
    ?   ---------------------------------------------------
    ?   |               Corner edge cases                 |
    ?   ---------------------------------------------------
    */
    //! top left corner
    if(row === 0 && col === 0) {            
        //right child
        if(!grid[row][col+1].isWall){        
            grid[row][col+1].path = "right"
            result.push(grid[row][col+1])
        }

        //bottom child
        if(!grid[row+1][col].isWall){        
            grid[row+1][col].path = "down"
            result.push(grid[row+1][col])    
        }
        // console.log(`This is result in getNeighbors: ${result}`)
        return result;
    }
    //! top right corner
    else if(row === 0 && col === (numCols-1)){
        //bottom child
        if(!grid[row+1][col].isWall){     
            grid[row+1][col].path = "down"   
            result.push(grid[row+1][col]) 
        }        

        //left child
        if(!grid[row][col-1].isWall){        
            grid[row][col-1].path = "left"
            result.push(grid[row][col-1]) 
        }       
        // console.log(`This is result in getNeighbors: ${result}`) 
        return result;
    }
    //! bottom right corner
    else if(row === (numRows-1) && col === (numCols-1)){
        //top child
        if(!grid[row-1][col].isWall){        
            grid[row-1][col].path = "up"
            result.push(grid[row-1][col]) 
        }        

        //left child
        if(!grid[row][col-1].isWall){ 
            grid[row][col-1].path = "left"       
            result.push(grid[row][col-1]) 
        }       
        // console.log(`This is result in getNeighbors: ${result}`) 
        return result;
    }
    //! bottom left corner
    else if(row === (numRows-1) && col === 0){
        //top child
        if(!grid[row-1][col].isWall){      
            grid[row-1][col].path = "up"  
            result.push(grid[row-1][col]) 
        }        

        //right child
        if(!grid[row][col+1].isWall){  
            grid[row][col+1].path = "right"      
            result.push(grid[row][col+1]) 
        }       
        // console.log(`This is result in getNeighbors: ${result}`) 
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
        if(!grid[row][col+1].isWall){  
            grid[row][col+1].path = "right"      
            result.push(grid[row][col+1]) 
        }        

        //bottom child
        if(!grid[row+1][col].isWall){ 
            grid[row+1][col].path = "down"       
            result.push(grid[row+1][col]) 
        }
        
        //left child  
        if(!grid[row][col-1].isWall){       
            grid[row][col-1].path = "left"  
            result.push(grid[row][col-1])            
        }     
        // console.log(`This is result in getNeighbors: ${result}`)   
        return result;
    }
    //! right border
    else if(col === numCols-1){
        //top child
        if(!grid[row-1][col].isWall){   
            grid[row-1][col].path = "up"     
            result.push(grid[row-1][col]) 
        }
        //bottom child
        if(!grid[row+1][col].isWall){
            grid[row+1][col].path = "down"        
            result.push(grid[row+1][col]) 
        }
        
        //left child
        if(!grid[row][col-1].isWall){ 
            grid[row][col-1].path = "left"
            result.push(grid[row][col-1])            
        }        
        // console.log(`This is result in getNeighbors: ${result}`)
        return result;
    }
    //! bottom border
    else if(row === numRows-1){
        //top child
        if(!grid[row-1][col].isWall){
            grid[row-1][col].path = "up"        
            result.push(grid[row-1][col]) 
        }
        
        //right child
        if(!grid[row][col+1].isWall){
            grid[row][col+1].path = "right"     
            result.push(grid[row][col+1]) 
        }
        //left child
        if(!grid[row][col-1].isWall){
            grid[row][col-1].path = "left"        
            result.push(grid[row][col-1])            
        }     
        // console.log(`This is result in getNeighbors: ${result}`)
        return result;
    }
    //! left border
    else if(col === 0){
        //top child
        if(!grid[row-1][col].isWall){        
            result.push(grid[row-1][col]) 
        }
        
        //right child
        if(!grid[row][col+1].isWall){        
            result.push(grid[row][col+1]) 
        } 
        
        //bottom child
        if(!grid[row+1][col].isWall){        
            result.push(grid[row+1][col]) 
        } 
        // console.log(`This is result in getNeighbors: ${result}`)
        return result;
    } 
    /*
    ?   ---------------------------------------------------
    ?   |          General Node with 8 children           | 
    ?   ---------------------------------------------------
    */
    else {
        //top child
        if(!grid[row-1][col].isWall && !grid[row-1][col].isWall){        
            result.push(grid[row-1][col]) 
        }                

        //right child
        if(!grid[row][col+1].isWall && !grid[row][col+1].isWall){        
            result.push(grid[row][col+1]) 
        }         

        //bottom child
        if(!grid[row+1][col].isWall && !grid[row+1][col].isWall){        
            result.push(grid[row+1][col]) 
        }         

        //left child
        if(!grid[row][col-1].isWall && !grid[row][col-1].isWall){        
            result.push(grid[row][col-1])            
        }
    }  

    //console.log(`This is result in getNeighbors: ${result}`)

    return result
}

function hasUnVisitedNodes(neighbors){
    let result = false

    neighbors.forEach(neighbor => {
        // console.log("Visited? " +neighbor.visited)
        if(neighbor.visited === false){
            // console.log('returning true from hasUnVisitedNodes()')
            result = true
        }
    })
    //console.log('returning false from hasUnVisitedNodes()')
    return result
}

function getUnvisitedNeighbors(neighbors){
    let result = []
    neighbors.forEach(neighbor => {
        if(neighbor.visited === false){
            result.push(neighbor)
        }
    })
    return result
}

// module.exports = generateMaze;