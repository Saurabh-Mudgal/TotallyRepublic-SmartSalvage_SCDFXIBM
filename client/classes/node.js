class Node {
    constructor(position, rate, neighbours, type) {
        this.position = position;
        // rate of objects entering node
        this.rate = rate;
        // array of road objects
        this.neighbours = neighbours;
        //Type can be entry, exit or general
        this.type = type;

        this.timeSinceLastCarSpawn = Infinity;
    }
    posString() {
        return JSON.stringify(this.position);
    }
}
