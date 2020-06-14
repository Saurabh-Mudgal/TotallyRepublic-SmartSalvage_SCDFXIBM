class Graph {
    constructor(nodes, roads, bidirectional) {
        this.graph = {};
        this.entry = {};
        this.exit = {};
        this.general = {};
        this.roads = roads;
        this.bidirectional = bidirectional;
        for (var i = 0; i < nodes.length; i++) {
            let currNode = nodes[i];
            if (currNode.type == "entry") {
                this.entry[currNode.posString()] = currNode;
            } else if (currNode.type == "exit") {
                this.exit[currNode.posString()] = currNode;
            } else {
                this.general[currNode.posString()] = currNode;
            }
            this.graph[currNode.posString()] = [];
        }
        for (var i = 0; i < roads.length; i++) {
            let currRoad = roads[i];
            // graph[currRoad.startNode.posString()].push({
            //     road: currRoad,
            //     neighbour: currRoad.endNode.posString(),
            // });
            this.graph[currRoad.startNode.posString()].push(currRoad);
            if (this.bidirectional) {
                reverseRoad = new Road(
                    currRoad.endNode,
                    currRoad.startNode,
                    currRoad.scaleFactor,
                    currRoad.stepDistance
                );
                graph[currRoad.endNode.posString()].push(reverseRoad);
            }
        }
    }
    getNeighbours(node) {
        return this.graph[node.posString()];
    }
}

export { Graph };
