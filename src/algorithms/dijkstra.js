let copyObjects = require('./copyObjects').default;

function dikstra(mainGrid, startNode, endNode, numRows, numCols){
    
    let grid = copyObjects.copy2dArrayOfObjects(mainGrid);

    let finalArray = []

    // startNode.isAStarStart = true;
    
    //* 1.)
    let open = []
    //* 2.)
    let closed = []
    
    open.push(startNode)
    
    while(open.length > 0){
        //get node with lowest f cost
        let currentNode = getLowestFCostNodeFromOpenArray(open)        
        // console.log(1)            

        // finalArray.push(currentNode)
        
        if(currentNode.parent != null){ //---------------->
        //if(currentNode != null){
            //finalArray.push(currentNode.parent)            
        }        

        removeFromArray(currentNode, open)        

        if(currentNode.row === endNode.row && currentNode.col === endNode.col){            
            // console.log("Reached Destination")
            return finalArray
        }
        
        if(inClosedArray(currentNode, closed) || currentNode.isWall){
            continue
        }        

        let neighbors = getNeighbors(currentNode, grid, numRows, numCols)        

        for(let index in neighbors){            
            let currentNeighbor = neighbors[index]

            if(currentNeighbor.isWall){
                continue
            }

            // if at destination
            if(currentNeighbor.row === endNode.row && currentNeighbor.col === endNode.col){            
                console.log("Reached Destination")
                return finalArray
            }

            // recently added
            if(currentNeighbor.isStart === true){
                continue
            }            

            if(!inOpenArray(currentNeighbor, open) || currentNeighbor.parent == null || currentNeighbor.parent.fCost < currentNode.fCost/* new path to currentNeighbor is shorter */){                  
                currentNeighbor.gCost = calculateGCost(currentNeighbor, startNode)
                currentNeighbor.hCost = calculateHCost(currentNeighbor, endNode)
                currentNeighbor.fCost = currentNeighbor.hCost
                
                currentNeighbor.parent = currentNode

                // console.log(`---- neighbor ${currentNeighbor.row},${currentNeighbor.col} [g: ${currentNeighbor.gCost} h: ${currentNeighbor.hCost} f: ${currentNeighbor.fCost}]`)

                // currentNode.parent = currentNeighbor

                // NEW
                finalArray.push(currentNeighbor)                

                if(!inOpenArray(currentNeighbor, open)){
                    open.push(currentNeighbor)
                }
            }            
        }
        closed.push(currentNode)        
        
    }

    console.log('did not reach destination')
}

function getNeighbors(currentNode, grid){
    let {row, col} = currentNode

    //the column of the start node detemines the currentNodes gCost
    // Math.abs(col*sqrt(2) - startNode.col*sqrt(2))
    
    try{
    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRighNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]  

    let arrayOfNeighbors = []

    arrayOfNeighbors.push(topLeftNeighbor)
    arrayOfNeighbors.push(topNeighbor)
    arrayOfNeighbors.push(topRightNeighbor)
    arrayOfNeighbors.push(rightNeighbor)
    arrayOfNeighbors.push(bottomRighNeighbor)
    arrayOfNeighbors.push(bottomNeighbor)
    arrayOfNeighbors.push(bottomLeftNeighbor)
    arrayOfNeighbors.push(leftNeighbor)


    return arrayOfNeighbors
    } catch(e){

    }

    

}

// G Cost = distance from starting node 
// // TODO: Sometimes you want to update the g cost, sometimes you don't
function calculateGCost(currentNode, startNode){
    let {row, col} = currentNode

    let yDistance = Math.abs(col - startNode.col)
    let xDistance = Math.abs(row - startNode.row)

    let gCost = Math.floor(Math.sqrt((xDistance + yDistance) * 10))
    
    return gCost
}

// ! H cost = distance from end node
function calculateHCost(currentNode, endNode){    
    let {row, col} = currentNode    
    //Euclidean Distance
    // let value = Math.floor(Math.sqrt(Math.abs((row-endNode.row)*2 + (col-endNode.col)*2)))
    // return value
    
    //Diagonal Distance
    // let value = Math.max(Math.abs(row+endNode.row), Math.abs(col+endNode.col))
    // return value

    //Manhattan Distance
    // let v1 = Math.abs(endNode.row - row)
    // let v2 = Math.abs(endNode.col - col)
    // return v1 + v2

    return 0
}

// ! F cost = G cost + H cost
function updateFCost(currentNode){
    currentNode.fCost = currentNode.gCost + currentNode.hCost
    return
}

// // TODO: May need to modify this so that the open array is being searched
function getLowestFCostNodeFromOpenArray(open){
    let min = Infinity
    let minNode = null    

    open.forEach(currentNode => {                
        if(currentNode.fCost < min){
            min = currentNode.fCost            
            minNode = currentNode
        }
    })
    
    return minNode
}

function inClosedArray(node, closed){

    let {row, col} = node    

    for(let i = 0; i < closed.length; i++){    
        //console.log("-")
        let currentNode = closed[i]
        if(row === currentNode.row && col === currentNode.col){
            return true
        }
    }

    return false
}

function inOpenArray(node, open){

    let {row, col} = node    

    for(let index in open){
        let currentNode = open[index]
        if(row === currentNode.row && col === currentNode.col){
            return true
        }
    }

    return false
}

function removeFromArray(node, array){

    let {row, col} = node

    for(let index in array){
       let currentNode = array[index]

       if(currentNode.row === row && currentNode.col === col){
            array.splice(index, 1);
       }
   } 
}

export default dikstra;