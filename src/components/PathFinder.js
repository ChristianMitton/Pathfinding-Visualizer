import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

import Node from './Node/Node';
import '../styles/style.css';

// import {
//     copyObjects.clone,
//     copyObjects.copy2dArrayOfObjects,
//     modify
// } from '../algorithms/copyObjects';

let GraphNode = require('../dataStructures/GraphNode').default;

let bfs = require('../algorithms/bfs').default;
let dfs = require('../algorithms/dfs').default;
let aStar = require('../algorithms/aStar').default;
let dijkstra = require('../algorithms/dijkstra').default;


let generateMaze = require('../algorithms/mazeGeneration').default;
let copyObjects = require('../algorithms/copyObjects').default;

let mazePattern = require('../mazePatterns').default

let DEFAULT_START_NODE_ROW = 10;
let DEFAULT_START_NODE_COL = 18;
let DEFAULT_FINISH_NODE_ROW = 10;
let DEFAULT_FINISH_NODE_COL = 31;

const numRows = 20;
const numCols = 50;

let start = true;

class PathFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
            clickedStart: false,
            clickedFinish: false

        };
    }

    componentDidMount() {
        // create grid when component is first rendered
        let grid = this.createDefaultGrid();        

        grid = this.createMazeTemplate(grid);
        
        this.setState({
            grid: grid
        });    
    }

    clear(){
        const newGrid = this.createDefaultGrid();        

        this.setState({
            grid: newGrid
        })
    }

    stopAlgorithm(){
        // this.setState({ state: this.state })  
        // window.location.reload(false)                   

                       
        // let grid = this.createDefaultGrid();        

        // grid = this.createMazeTemplate(grid);
        
        // this.setState({
        //     grid: grid
        // });                            

        // this.forceUpdate()

        window.location.reload()  
        
    }

    //when mouse button is pressed
    handleMouseDown(row, col){
        //if the start node is clicked
        if(row === DEFAULT_START_NODE_ROW && col === DEFAULT_START_NODE_COL){
            console.log("clicked Start node")

            const newGrid = this.getNewGridWithUpdatedStartNode(this.state.grid, row, col, DEFAULT_START_NODE_ROW, DEFAULT_START_NODE_COL)        
            this.setState({
                grid: newGrid,
                clickedStart: true
            })
            return
        }

        if(row === DEFAULT_FINISH_NODE_ROW && col === DEFAULT_FINISH_NODE_COL){
            console.log("clicked End node")

            const newGrid = this.getNewGridWithUpdatedFinishNode(this.state.grid, row, col, DEFAULT_FINISH_NODE_ROW, DEFAULT_FINISH_NODE_COL)        
            this.setState({
                grid: newGrid,
                clickedFinish: true
            })
            return
        }
        
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({
            grid: newGrid,
            mouseIsPressed: true
        })
        console.log(`pressed mouse button on node (${row},${col})`)
    }
//////////////////////////////////////////
    //when mouse is hovering
    handleMouseEnter(row, col){        
        
        //if the start button is clicked
        // if(row === DEFAULT_START_NODE_ROW && col === DEFAULT_START_NODE_COL){
        if(this.state.clickedStart){
            const newGrid = this.getNewGridWithUpdatedStartNode(this.state.grid, row, col, DEFAULT_START_NODE_ROW, DEFAULT_START_NODE_COL)
            this.setState({
                grid: newGrid,                
            })
            return
        }
        if(this.state.clickedFinish){
            const newGrid = this.getNewGridWithUpdatedFinishNode(this.state.grid, row, col, DEFAULT_FINISH_NODE_ROW, DEFAULT_FINISH_NODE_COL)
            this.setState({
                grid: newGrid,                
            })
            return
        }
        //if the mouse isnt pressed, do nothing
        if(!this.state.mouseIsPressed){
            // console.log(`hovering over node ${row},${col}`)
            
            return
        };
        
        console.log(`hovering over node (${row},${col})`)
        let newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col)
        this.setState({
            grid: newGrid
        })

    }

    //when you release mouse button
    handleMouseUp(row, col){
        //once you release the mouse button, set mouseIsPressed to false
        //console.log(`release mouse button on node (${row},${col})`)
        this.setState({
            mouseIsPressed: false,
            clickedStart: false,
            clickedFinish: false
        })
    }

    //visualizeBFS(startNode, endNode){
    visualizeBFS(){        

        const {grid} = this.state;

        const startNode = grid[DEFAULT_START_NODE_ROW][DEFAULT_START_NODE_COL];
        const finishNode = grid[DEFAULT_FINISH_NODE_ROW][DEFAULT_FINISH_NODE_COL];

        const visitedNodes = bfs(grid, startNode, finishNode, numRows, numCols);

        this.animate(visitedNodes);

    }

    visualizeDFS(){
        const {grid} = this.state;

        const startNode = grid[DEFAULT_START_NODE_ROW][DEFAULT_START_NODE_COL];
        const finishNode = grid[DEFAULT_FINISH_NODE_ROW][DEFAULT_FINISH_NODE_COL];

        let visitedNodes = dfs(grid, startNode, finishNode, numRows, numCols);        

        this.animate(visitedNodes);
    }

    visualizeAStar(){
        const {grid} = this.state;

        const startNode = grid[DEFAULT_START_NODE_ROW][DEFAULT_START_NODE_COL];
        const finishNode = grid[DEFAULT_FINISH_NODE_ROW][DEFAULT_FINISH_NODE_COL];

        let visitedNodes = aStar(grid, startNode, finishNode, numRows, numCols);

        this.animate(visitedNodes);
    }

    visualizeDijkstra(){
        const {grid} = this.state;

        const startNode = grid[DEFAULT_START_NODE_ROW][DEFAULT_START_NODE_COL];
        const finishNode = grid[DEFAULT_FINISH_NODE_ROW][DEFAULT_FINISH_NODE_COL];

        let visitedNodes = dijkstra(grid, startNode, finishNode, numRows, numCols);

        this.animate(visitedNodes);

    }

    createMaze(){
        const {grid} = this.state;

        let visitedNodes = generateMaze(grid, numRows, numCols)

        this.animateMaze(visitedNodes)
    }

    animate(visitedNodes){
        for(let index in visitedNodes){
            setTimeout(() => {
                if(!start){
                    return
                }

                const updatedGrid = copyObjects.copy2dArrayOfObjects(this.state.grid);
                const currentNode = visitedNodes[index]; 
                
                updatedGrid[currentNode.row][currentNode.col].visited = true; 
                
                this.setState({
                    grid: updatedGrid
                })
            }, 50 * index)
        }
    }    

    animateMaze(visitedNodes){
        for(let index in visitedNodes){
            setTimeout(() => {
                if(!start){
                    return
                }

                const updatedGrid = copyObjects.copy2dArrayOfObjects(this.state.grid);
                const currentNode = visitedNodes[index]; 
                
                updatedGrid[currentNode.row][currentNode.col].isWall = true; 
                
                this.setState({
                    grid: updatedGrid
                })
            }, 35 * index)
        }
    }

    render() {
        const {grid} = this.state;  
        
        let count = 0;        

        return (
            <>
            {/* <button onClick={() => this.createMaze()}>
                Create Maze
            </button> */}    
            <Collapsible trigger="Help" className="help">
                <p className="start_text">• Green = start. Click and drag to change position.</p>
                <p className="end_text">• Red = finish. Click and drag to change position.</p>
                <p className="regular_text">• Clear Walls = remove walls / visited nodes ( If algorithm is in mid execution, algorithm will continue running after clear )</p>
                <p className="regular_text">• Click and drag on grid to create walls</p>                
            </Collapsible>

            <Collapsible trigger="Algorithm Guide" className="algo">
            <Collapsible trigger="A* ( A star )">
                <div className="regular_text">                
                    <p>
                        <h1>Summary</h1>
                        A* is a pathfinding algorithm backed by simple artificial intelligence. It uses hueristics to make an educated guess at every node, and by doing this it dynamically finds the shortest path to a target node. It's quicker
                        than Dijkstra's, but only on the condition that the location of the target node is known.
                    </p>

                    <h1>How it Works</h1>
                    <p>
                        <h3>Basics</h3>    
                        Every node has 3 costs associated with it: a G cost (distance the node is from the starting node), an H cost (distance the node is from the target node) 
                        and an F cost (sum of the G and H cost). Every neighbor of the node has it's F cost calcuated via a hueristic, and whichever node has the lowest F cost is visited next. The choosing
                        of the lowest F cost is the educated guess that the algorithm is making.
                    </p>
                    <p>
                        <h3>Hueristics: Calculating the H Cost</h3>
                        <li>
                        Manhattan distance (what this visualizer uses)
                        </li>
                        <ul>
                            <li type="circle">
                            HCost = Math.abs(target_node_row - current_node_row) + Math.abs(target_node_col - current_node_col)
                            </li>
                            <li type="circle">
                                This hueristic is used when a node is allowed to move in four directions (up, down, left, right)
                            </li>  
                        </ul>
                        <li>
                        Diagonal distance
                        </li>
                        <ul>
                            <li type="circle">
                            H Cost = Max(Math.abs(current_node_row + target_node_row), Math.abs(current_node_col + current_node_col))
                            </li>
                            <li type="circle">
                                This hueristic is used when a node is allowed to move in 8 directions (up, down, left, right, all corners)
                            </li>                   
                        </ul>                                            
                        <h3>Hueristics: Calculating the G Cost</h3>
                        <li>
                        There are differnt ways to calculate the G Cost depending on the application. Since this visualizer uses a 2-d grid, this formula is used:
                        <ul>
                            <li type="circle">
                            G Cost = (sqrt(Math.abs(current_node_col - start_node_col) + Math.abs(current_node_row - start_node_row)) * 10)
                            </li>                                       
                        </ul>
                        </li>
                    </p>  
                </div>
                </Collapsible>
                <Collapsible trigger="Breadth First Search ( BFS )">    
                <div className="regular_text">                
                    <p>
                    <h1>Summary</h1>
                    BFS is an algorithm that, starting at a root node, visits all of that root's neighbors. Neighbors are also nodes, and 'root' is just a name for the starting node. After visiting all the neighbors of
                    the root, it visits all the neighbors of the root's neighbors. This pattern continues in a recursive fashion until eventually, the target node is a neighbor.                    
                    </p>
                    <p>                    
                    This behavior, similar to dropping a rock in a pond and having the ripples expand outward, is captured programmatically through the use of a queue.
                    </p>
                    <p>
                    <h1>How it Works</h1>
                    A node (beginning with the root node) is enqueued into a queue. While the queue is not empty, the node that is next in line is dequeued from the queue, and then each of that nodes
                    neighbors is enqueued into the queue. A check is performed to see if at any point a neighbor is the target node.
                    </p>
                </div>
                    
                </Collapsible>
                <Collapsible trigger="Depth First Search ( DFS )">
                <div className="regular_text">                
                    <p>
                    <h1>Summary</h1>
                    DFS is an algorithm that, starting at a root node, picks a single neighbor. A neighbor is also a node, and 'root' is just a name for the starting node. After picking one neighbor of the root, it picks
                    a single neighbor of the roots neighbor. The idea is to pick a single route, and to go as far down that route as possible. After reaching the end of that route, it starts at the beginning and then 
                    picks another unvisited route.
                    </p>
                    <p>                    
                    Similar to driving as far down a road as possible, reversing and then going as far as you can down another road until you visit all the roads in your neighborhood
                    , this behavior is captured programmatically through the use of recursion programming.
                    </p>
                    <p>
                    <h1>How it Works</h1>
                    Iterate through all the neighbors of a node (beginning with the root node) in a DFS function that accepts a root as a parameter. For each neighbor, call DFS again with that 
                    neighbor passed as the root. Continually check if the root is the target node.                     
                    </p>
                </div>
                </Collapsible>
                
                <Collapsible trigger="Dijkstra">
                    <div className="regular_text"> 
                        <p>
                            <h1>Summary</h1>
                            Dijkstra's is a pathfinding algorithm that finds the shortest cost to a target node. Initially it does not know where the target node is, unlike A*.
                        </p>

                        <p>
                            <h1>How it Works</h1>
                            The tentative cost of each node is set to infinity, escept the initial node which is set to 0. At each node, 
                            the cost of its neighbors is calculated by taking the distance of that node added to the edge cost inbetween the current node and the neighbor. 
                            This is done for each neighbor.
                        </p>
                        <p>
                            The costs of the neighbor nodes are either updated/ left alone depending on the lowest calculated distance. Once all nodes have been visited, the shortest 
                            cost path can be followed.                        
                        </p>
                    </div> 
                </Collapsible>
                {/*  */}
            </Collapsible>
            <button onClick={() => this.visualizeAStar()} className="button">
                Visualize A*
            </button>
            <button onClick={() => this.visualizeBFS()} className="button">
                Visualize BFS
            </button>            
            <button onClick={() => this.visualizeDFS()} className="button">
                Visualize DFS
            </button>            
            <button onClick={() => this.visualizeDijkstra()} className="button">
                Visualize Dijkstra's
            </button>
            <button onClick={() => this.clear()} className="button">
                Clear Walls
            </button>
            <button onClick={() => this.stopAlgorithm()} className="button">
                Restart
            </button>
            <div className="grid">
            {/* Map can have three parameters: value, index, array */}
                {grid.map( (row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {                                
                                // obtaing the current node and create a div for it
                                const {value, row, col, isStart, isFinish, visited, isWall} = node;
                                return (
                                    <Node 
                                        key={count++} 
                                        value={value}
                                        row={row}
                                        col={col}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        visited={visited}
                                        isWall={isWall}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                        onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                                    />
                                )
                            }) }                            
                        </div>
                    )
                })}                
            </div>
            </>
        )
    }

    createDefaultGrid(){
        const grid = [];
        for (let row = 0; row < numRows; row++){
            const currentRow = [];
            for(let col = 0; col < numCols; col++) {                
                const currentNode = new GraphNode("", row, col);                
                currentNode.isStart = row === DEFAULT_START_NODE_ROW && col === DEFAULT_START_NODE_COL;
                currentNode.isFinish = row === DEFAULT_FINISH_NODE_ROW && col === DEFAULT_FINISH_NODE_COL;
                
                currentRow.push(currentNode);
            }
            grid.push(currentRow);
            //! At this point, each index contains a graphNode
        }
        return grid;
    }

    readTextFile(file){
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function (){
            if(rawFile.readyState === 4){
                if(rawFile.status === 200 || rawFile.status == 0){
                    var allText = rawFile.responseText;
                    alert(allText);
                }
            }
        }
        rawFile.send(null);
    }

    
    createMazeTemplate(newGrid){
        // let grid = this.state.grid        
        // this.readTextFile("file:///Users/chrismitton/Desktop/new_pathfinding_visualizer/src/mazeNodes.txt")
        // let file=fopen(getScriptPath(),0);
        // fetch('../mazeNodes.txt')
        //     .then((r) => r.text())
        //     .then(text  => {
        //         console.log(text);
        // })          

        // console.log('newGrid: ' + newGrid)

        let coordinates = mazePattern.split('-')
        coordinates.forEach((c) => {
            let pair = c.split(',')
            let x = parseInt(pair[0])
            let y = parseInt(pair[1])
                    
            // console.log(x,y)
            newGrid[x][y].isWall = true            
          });

        // console.log(coordinates)
        return newGrid

    }

    getNewGridWithWallToggled(grid, row, col){
            const newGrid = copyObjects.copy2dArrayOfObjects(grid)
            const node = newGrid[row][col]
            const newNode = copyObjects.clone(node)
            newNode.isWall = true
            newGrid[row][col] = newNode
            return newGrid
    }

    getNewGridWithUpdatedStartNode(grid, row, col, oldRow, oldCol){
        const newGrid = copyObjects.copy2dArrayOfObjects(grid)        
        
        const oldStartNode = newGrid[oldRow][oldCol]
        const newStartNode = newGrid[row][col]

        const oldStartNodeCopy = copyObjects.clone(oldStartNode)
        const newStartNodeCopy = copyObjects.clone(newStartNode)

        DEFAULT_START_NODE_ROW = row
        DEFAULT_START_NODE_COL = col  

        oldStartNodeCopy.isStart = false
        newStartNodeCopy.isStart = true
        
        newGrid[oldRow][oldCol] = oldStartNodeCopy        
        newGrid[row][col] = newStartNodeCopy

        return newGrid
    }
    
    getNewGridWithUpdatedFinishNode(grid, row, col, oldRow, oldCol){
        const newGrid = copyObjects.copy2dArrayOfObjects(grid)        
        
        const oldFinishNode = newGrid[oldRow][oldCol]
        const newFinishNode = newGrid[row][col]

        const oldStartNodeCopy = copyObjects.clone(oldFinishNode)
        const newStartNodeCopy = copyObjects.clone(newFinishNode)

        DEFAULT_FINISH_NODE_ROW = row
        DEFAULT_FINISH_NODE_COL = col  

        oldStartNodeCopy.isFinish = false
        newStartNodeCopy.isFinish = true
        
        newGrid[oldRow][oldCol] = oldStartNodeCopy        
        newGrid[row][col] = newStartNodeCopy

        return newGrid
    }
}

export default PathFinder;

/**
 * NOTES:
 * 
 * TODO: When someone clicks a node, have a pop up that gives choice of setting start and end node
 * 
 * 
 * 
 */