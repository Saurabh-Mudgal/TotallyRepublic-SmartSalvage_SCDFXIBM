class graph {
  constructor(nodes, roads) {
    this.graph = {};
    for (i = 0; i < nodes.length; i++) {
      let currNode = nodes[i];
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
