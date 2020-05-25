class GraphNode {
    constructor(value, row, col){
        this.value = value;
        this.row = row;
        this.col = col; 
        this.visited = false;
        this.isStart = false;
        this.isFinish = false;
        this.isWall = false;
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;
        this.parent = null;
        this.hover = false;
        this.isAStarStart = false;        
        this.next = null;    
        this.prev = null;
        this.topWall = false;
        this.rightWall = false;
        this.bottomWall = false;
        this.leftWall = false;
        this.weight = Infinity;            
    }
}

export default GraphNode;