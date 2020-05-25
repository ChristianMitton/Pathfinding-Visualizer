function radarBfs(mainGrid, startNode, endNode, numRows, numCols){    
    let currentNode = {
        ...startNode
    }

    while(!(currentNode.row === endNode.row && currentNode.col === endNode.col)){
        let {row, col} = currentNode;  
        let topLeftCorner = grid[row][col+1]

        //for(let i = 0; i < )
    }
    
}

// module.exports = radarBfs;