function selectNeighbour(startNode, endPosition) {
    if (
        startNode.position.y > endPosition.y &&
        startNode.position.x > endPosition.x
    ) {
        return true;
    }
    return false;
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
            if (selectNeighbour(newNeighbour, endPosition)) {
                path.push(currRoad);
                currNode = newNeighbour;
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
                    currNode = newNeighbour;
                }
            }
        }
    }
    return path;
}

function bfsShortestPath(graph, startNode, endNode) {
    var currNode = [startNode, true];

    var pathStack = [];
    var visitedNodes = {};
    while (currNode.posString() != endNode.posString()) {
        visitedNodes[currNode[0].posString()] = currNode[1];

        var neighbours = graph.getNeighbours(currNode[0]);
        for (var i = 0; i < neighbours.length; i++) {
            var currNeighbourRoad = neighbours[i];
            var nextNode = currNeighbourRoad.endNode;
            if (
                !graph.entry[nextNode.posString()] &&
                !graph.exit[nextNode.posString()] &&
                !visitedNodes[nextNode.posString()]
            ) {
                pathStack.push([nextNode, currNode[0]]);
            }
        }

        var currNode = pathStack[0];
        pathStack = pathStack.slice(1, pathStack.length);
    }

    path = [endNode];
    parent = endNode;
    while (parent != true) {
        path.push(visitedNodes[currNode]);
        parent = visitedNodes[currNode];
    }

    path = path.reverse().slice(1, path.length);

    return convertNodesToPath(path, graph);
}

function convertNodesToPath(path, graph) {
    myPaths = [];

    for (var i = 0; i < path.length - 1; i++) {
        currNode = path[i];
        neighbourRoads = graph.getNeighbours(currNode);

        for (j = 0; j < neighbourRoads.length; j++) {
            currRoad = neighbourRoads[j];
            if (currRoad.endNode.posString() == path[i + 1].posString()) {
                myPaths.push(currRoad);
                break;
            }
        }
    }

    return myPaths;
}
