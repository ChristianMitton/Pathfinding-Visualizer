function calculateGCostOfNeighbors(currentNode, startNode, grid){

    let {row, col} = currentNode

    //the column of the start node detemines the currentNodes gCost
    // Math.abs(col*sqrt(2) - startNode.col*sqrt(2))
    

    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRighNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]    

    topLeftNeighbor.gCost += Math.abs(col*Math.sqrt(2)*10 - startNode.col*Math.sqrt(2)*10) //14
    topNeighbor.gCost += Math.abs(col - startNode.col)
    topRightNeighbor.gCost += Math.abs(col*Math.sqrt(2)*10 - startNode.col*Math.sqrt(2)*10) //14
    rightNeighbor.gCost += Math.abs(col - startNode.col)
    bottomRighNeighbor.gCost += Math.abs(col*Math.sqrt(2)*10 - startNode.col*Math.sqrt(2)*10) //14
    bottomNeighbor.gCost += Math.abs(col - startNode.col)
    bottomLeftNeighbor.gCost += Math.abs(col*Math.sqrt(2)*10 - startNode.col*Math.sqrt(2)*10) //14
    leftNeighbor.gCost += Math.abs(col - startNode.col)
    
}

function calculateHCostOfNeighbors(currentNode, endNode, grid){

    let {row, col} = currentNode

    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRighNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]

    topLeftNeighbor.hCost = calculateHCost(topLeftNeighbor, endNode)
    topNeighbor.hCost = calculateHCost(topNeighbor, endNode)
    topRightNeighbor.hCost = calculateHCost(topRightNeighbor, endNode)
    rightNeighbor.hCost = calculateHCost(rightNeighbor, endNode)
    bottomRighNeighbor.hCost = calculateHCost(bottomRighNeighbor, endNode)
    bottomNeighbor.hCost = calculateHCost(bottomNeighbor, endNode)
    bottomLeftNeighbor.hCost = calculateHCost(bottomLeftNeighbor, endNode)
    leftNeighbor.hCost = calculateHCost(leftNeighbor, endNode)
    
}

function calculateFCostOfNeighbors(currentNode, grid){

    let {row, col} = currentNode    

    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRighNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]

    updateFCost(topLeftNeighbor)
    updateFCost(topNeighbor)
    updateFCost(topRightNeighbor)
    updateFCost(rightNeighbor)
    updateFCost(bottomRighNeighbor)
    updateFCost(bottomNeighbor)
    updateFCost(bottomLeftNeighbor)
    updateFCost(leftNeighbor)    

}

function getLowestHCostFromNeighbors(currentNode, grid){

    let {row, col} = currentNode

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

    let min = Infinity
    let minNode = null

    for(let index in arrayOfNeighbors){
        currentNode = arrayOfNeighbors[index]
        if(currentNode.hCost < min){
            min = currentNode.hCost
            minNode = currentNode
        }
    }

    return minNode
}

function hasMultipleNeigborsWithSmallestFCost(currentNode, fcost, grid, open){
    let {row, col} = currentNode

    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRightNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]

    let arrayOfNeighbors = []

    if(inOpenArray(topLeftNeighbor,open)) arrayOfNeighbors.push(topLeftNeighbor.fCost)
    if(inOpenArray(topNeighbor,open)) arrayOfNeighbors.push(topNeighbor.fCost)
    if(inOpenArray(topRightNeighbor,open)) arrayOfNeighbors.push(topRightNeighbor.fCost)
    if(inOpenArray(rightNeighbor,open)) arrayOfNeighbors.push(rightNeighbor.fCost)
    if(inOpenArray(bottomRightNeighbor,open)) arrayOfNeighbors.push(bottomRightNeighbor.fCost)
    if(inOpenArray(bottomNeighbor,open)) arrayOfNeighbors.push(bottomNeighbor.fCost)
    if(inOpenArray(bottomLeftNeighbor,open)) arrayOfNeighbors.push(bottomLeftNeighbor.fCost)
    if(inOpenArray(leftNeighbor,open)) arrayOfNeighbors.push(leftNeighbor.fCost)

    arrayOfNeighbors.sort()

    for(let i = 0; i < arrayOfNeighbors.length-1; i++){
        let currentNeighborFCost = arrayOfNeighbors[i]
        let nextNeighborFCost = arrayOfNeighbors[i+1]

        if(currentNeighborFCost === fcost){
            if(nextNeighborFCost === fcost){
                return true
            }
        }
    }

    return false
}