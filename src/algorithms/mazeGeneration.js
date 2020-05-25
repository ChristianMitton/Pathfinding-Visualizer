let copyObjects = require('./copyObjects').default;

//Pick random number between 1 and 4: Math.floor(Math.random()*4)

function generateMaze(mainGrid, numRows, numCols){
    let grid = copyObjects.copy2dArrayOfObjects(mainGrid);
    let result = []

    createChamber(grid, result, numRows, numCols)

    let topLeftNode = grid[0][0]
    let topRightNode = grid[numRows-1][numCols-1]
    let bottomRightNode = grid[numRows-1][numCols-1]
    let bottomLeftNode = grid[numRows-1][0]
    
    generateMazeRec(grid, topLeftNode, topRightNode, bottomRightNode, bottomLeftNode, result);
    
    console.log('done')
    return result

}

function generateMazeRec(grid, topLeftNode, topRightNode, bottomRightNode, bottomLeftNode, result){    

    let numRows = bottomRightNode.row-1
    let numCols = bottomRightNode.col-1    

    let width = bottomRightNode.col - topLeftNode.col
    let height = bottomRightNode.row - topLeftNode.row

    console.log("Width " + width)
    console.log("Height " + height)

    if(width < 2 && height < 2){
        return
    }

    let orientation = chooseOrientation(width, height)

    if(orientation === 'HORIZONTAL'){
        let newCorners = bisectHorizontally(grid, topLeftNode, bottomRightNode, numRows, numCols, result)          
        let newTopLeftNode = newCorners[0]
        let newTopRightNode = newCorners[1]        
        let newBottomRightNode = newCorners[2]
        let newBottomLeftNode = newCorners[3]

        console.log(`new corners H: topLeft: (${newTopLeftNode.row}, ${newTopLeftNode.col}) topRight: (${newTopRightNode.row}, ${newTopRightNode.col})`)
        console.log(`new corners H: bottomRight: (${newBottomRightNode.row}, ${newBottomRightNode.col}) bottomLeft: (${newBottomLeftNode.row}, ${newBottomLeftNode.col})`)

        //! ------------------------------------------------
        //! NOTE maybe calculate new top nodes for top and bottom for horizontal bar, and new top nodes for both left and right side of bar for vertical
        //! ------------------------------------------------

        //recurse above
        // generateMazeRec(grid, newTopLeftNode, newTopRightNode, topRightNode, topLeftNode, result)        

        //recurse below                
        generateMazeRec(grid, newTopLeftNode, topRightNode, newBottomRightNode, bottomLeftNode, result)        

    } else if(orientation === 'VERTICAL'){
        let newCorners = bisectVertically(grid, topLeftNode, bottomRightNode, numRows, numCols, result)                  
        let newTopLeftNode = newCorners[0]
        let newTopRightNode = newCorners[1]        
        let newBottomRightNode = newCorners[2]
        let newBottomLeftNode = newCorners[3]
        
        // console.log(`new corners: topLeft: (${newTopLeftNode.row}, ${newTopLeftNode.col}) bottomRIght: (${newBottomRightNode.row}, ${newBottomRightNode.col})`)
        console.log(`new corners V: topLeft: (${newTopLeftNode.row}, ${newTopLeftNode.col}) topRight: (${newTopRightNode.row}, ${newTopRightNode.col})`)
        console.log(`new corners V: bottomRight: (${newBottomRightNode.row}, ${newBottomRightNode.col}) bottomLeft: (${newBottomLeftNode.row}, ${newBottomLeftNode.col})`)

        //recurse on right
        generateMazeRec(grid, newTopLeftNode, topRightNode, newBottomRightNode, bottomLeftNode, result)

        //recurse on left        
        generateMazeRec(grid, topLeftNode, newTopLeftNode, bottomLeftNode, newBottomLeftNode, result)        
    }
    
}

function bisectHorizontally(grid, topLeftNode, bottomRightNode, numRows, numCols, result){       
    let randomRowIndex = getRandomNumberBetween(topLeftNode.row+2, bottomRightNode.row-2)    
    let randomGap = getRandomNumberBetween(topLeftNode.col+2, bottomRightNode.col-1) //6
    console.log("random row: " + randomRowIndex)
    console.log("random gap: " + randomGap)

    let newTopLeftNode = grid[randomRowIndex][topLeftNode.row]
    let newTopRightNode = grid[randomRowIndex][bottomRightNode.col]
    let newBottomRightNode = grid[bottomRightNode.row][bottomRightNode.col]
    let newBottomLeftNode = grid[bottomRightNode.row][topLeftNode.row]

    for(let i = topLeftNode.row; i < bottomRightNode.col; i++){
        if(i === randomGap || grid[randomRowIndex][i].isStart === true || grid[randomRowIndex][i].isFinish === true){
            continue
        }
        // if(grid[randomRowIndex][i].isWall === true){
        //     return [newTopLeftNode, newTopRightNode, newBottomRightNode, newBottomLeftNode]
        // }
        grid[randomRowIndex][i].isWall = true;        
        result.push(grid[randomRowIndex][i])
    }

    return [newTopLeftNode, newTopRightNode, newBottomRightNode, newBottomLeftNode]
}

function bisectVertically(grid, topLeftNode, bottomRightNode, numRows, numCols, result){    
    let randomColIndex = getRandomNumberBetween(topLeftNode.row+2, bottomRightNode.col-1)
    
    let randomGap = getRandomNumberBetween(topLeftNode.row+2, bottomRightNode.row-1) //6
    
    console.log(randomColIndex)
    console.log(randomGap)

    for(let i = topLeftNode.row; i < bottomRightNode.row; i++){        
        if(i === randomGap || grid[i][randomColIndex].isStart === true || grid[i][randomColIndex].isFinish){
            continue
        }
        grid[i][randomColIndex].isWall = true;        
        result.push(grid[i][randomColIndex])
    }
    
    let newTopLeftNode = grid[topLeftNode.row][randomColIndex]
    let newBottomRightNode = grid[bottomRightNode.row][bottomRightNode.col]
    let newTopRightNode = grid[topLeftNode.row][bottomRightNode.col]
    let newBottomLeftNode = grid[bottomRightNode.row][randomColIndex]
    
    return [newTopLeftNode, newTopRightNode, newBottomRightNode, newBottomLeftNode]
    
}

function getRandomNumberBetween(min,max){    
    return Math.floor(Math.random()*(max-min+1)+min);
}

function chooseOrientation(width, height){
    if(width < height){
        return 'HORIZONTAL'
    } else if(width > height){
        return 'VERTICAL'
    }
    let rand = getRandomNumberBetween(0,1)
    if(rand === 1){
        return 'HORIZONTAL'
    } else {
        return 'VERTICAL'
    }
}

function createChamber(grid, result, numRows, numCols){
    for(let i = 0; i < numCols; i++){
        grid[0][i].isWall = true
        result.push(grid[0][i])
    }

    for(let i = 0; i < numRows; i++){
        grid[i][numCols-1].isWall = true;
        result.push(grid[i][numCols-1])
    }

    for(let i = numCols-1; i > 0; i--){
        grid[numRows-1][i].isWall = true;
        result.push(grid[numRows-1][i])
    }

    for(let i = numRows-1; i > 0; i--){
        grid[i][0].isWall = true
        result.push(grid[i][0])
    }
}

// module.exports = generateMaze;