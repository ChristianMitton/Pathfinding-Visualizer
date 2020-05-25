class Queue {
    constructor(){
        this.items = [];
    }

    enqueue(element){
        this.items.push(element);
    }

    dequeue(element){
        if(this.isEmpty()){
            console.log("Empty queue");
            return;
        }
        return this.items.shift();
    }

    isEmpty(){
        if(this.items.length === 0){
            return true;
        }
        return false;
    }

    printQueue(){
        for(let index in this.items){
            console.log(this.items[index]);
        }
    }

    printGraphQueue(){
        console.log();
        //process.stdout.write("[ ");
        for(let index in this.items){
            console.log(`(${this.items[index].row},${this.items[index].col}), `);
            //process.stdout.write(`(${this.items[index].row},${this.items[index].col}), `);
        }
        console.log("]");
    }
}

// module.exports = Queue;
export default Queue;