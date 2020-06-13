function selectNeighbour(startNode, endNode) {
  return startNode.x - endNode.x + endNode.y - endNode.y >= 0;
}
function shortestPath(graph, startNode, endPosition) {
  var currNode = startNode;
  var path = [];

  while (
    currNode.position.x > endPosition.x &&
    currNode.position.y > endPosition.y
  ) {
    var currRoads = graph.getNeighbours(currNode);

    var success = false;
    for (let i = 0; i < currRoads.length; i++) {
      let currRoad = currRoads[i];
      let newNeighbour = currRoads[i].endNode;
      if (selectNeighbour(currNode, newNeighbour)) {
        path.push(currRoad);
        currRoad = newNeighbour;
        success = true;
        break;
      }
    }
    if (!success) {
      for (let i = 0; i < currRoads.length; i++) {
        let currRoad = currRoads[i];
        let newNeighbour = currRoads[i].endNode;
        if (
          newNeighbour.position.x == endPosition.x ||
          newNeighbour.position.y == endPosition.y
        ) {
          path.push(currRoad);
          currRoad = newNeighbour;
        }
      }
    }
  }
  return path;
}
