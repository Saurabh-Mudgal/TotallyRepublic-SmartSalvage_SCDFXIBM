class graph {
    constructor(nodes, roads) {
        this.graph = {};
        this.entry = {};
        this.exit = {};
        this.general = {};
        for (i = 0; i < nodes.length; i++) {
            let currNode = nodes[i];
            if (currNode.type == "entry") {
                this.entry[currNode.posString()] = currNode;
            } else if (currNode.type == "exit") {
                this.exit[currNode.posString()] = currNode;
            } else {
                this.general[currNode.posString()] = currNode;
            }
            graph[currNode.posString()] = [];
        }
        for (i = 0; i < roads.length; i++) {
            let currRoad = roads[i];
            graph[currRoad.startNode.posString()].push({
                road: currRoad,
                neighbour: currRoad.endNode.posString(),
            });
        }
    }
    getNeighbours(node) {
        return this.graph[node.posString()];
    }
}
