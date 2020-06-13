class Traffic {
    constructor(roadGraph, scaleFactor, stepDistance) {
        this.roadGraph = roadGraph;
        this.scaleFactor = scaleFactor;
        this.stepDistance = stepDistance;
        this.cars = {};
        this.entryNodes = Object.keys(this.roadGraph.entry);
        this.shortestPath = [];
        this.fireTruckRoadIndex = 0;
        this.isFireTruckSpawned = false;
        // this.exitNodes = Object(this.roadGraph.exit);
        // this.generalNodes = Object.keys(this.roadGraph.general);
    }

    render() {
        var sendFireTruck = this.shortestPath.length != 0;
        for (var i = 0; i < this.shortestPath.length; i++) {
            currRoad = this.shortestPath[i];
            sendFireTruck = sendFireTruck && currRoad.currTraffic == 0;
            if (currRoad.currTraffic != 0) {
                break;
            }
        }

        if (sendFireTruck) {
            this.sendFireTruckNow();
        }

        if (this.isFireTruckSpawned) {
            if (this.fireTruckRoadIndex == this.shortestPath.length - 1) {
                this.fireTruck.road.endNode = this.endPosition;
            } else {
                this.fireTruck.move();

                if (
                    JSON.stringify(this.fireTruck.position) ==
                    JSON.stringify(
                        this.shortestPath[this.fireTruckRoadIndex].endNode
                            .position
                    )
                ) {
                    this.fireTruckRoadIndex += 1;
                    this.fireTruck.road.removeCar();
                    this.shortestPath[this.fireTruckRoadIndex].addCar(
                        this.fireTruck
                    );
                }
            }
        }
        //Moving each exisiting car
        allCars = Object.keys(this.cars);
        for (var i = 0; i < allCars.length; i++) {
            var currCarKey = allCars[i];
            var currCar = this.cars[currCarKey];
            currCar.move();
            // if car is on a general node then decide where to turn
            if (this.roadGraph.general[currCar.posString()] != null) {
                currGeneralNode = this.roadGraph.general[currCar.posString()];
                connectedRoads = this.roadGraph[currGeneralNode.posString()];
                for (var i = 0; i < connectedRoads.length; i++) {
                    currRoad = connectedRoads[i];

                    if (currRoad.currTraffic < currRoad.requiredTraffic) {
                        currCar.road.removeCar();
                        currRoad.addCar(currCar);
                        break;
                    }
                }
            }
            //if car is at exit node then destroy and pop

            if (this.roadGraph.exit[currCar.posString()] != null) {
                currCar.road.removeCar();
                delete this.cars[currCar.id];
                delete currCar;
            }
        }

        //Spawning new cars

        for (var i = 0; i < this.entryNodes; i++) {
            var currEntryNodeKey = this.entryNodes[i];
            var currEntryNode = this.roadGraph.entry[currEntryNodeKey];
            if (currEntryNode.timeSinceLastCarSpawn > 1) {
                var connectedRoad = this.roadGraph[
                    currEntryNode.posString()
                ][0];

                var spawnCar = Math.random() < 0.5;
                if (connectedRoad.requiredTraffic != 0 && spawnCar) {
                    newCar = new Car(
                        currEntryNode.position,
                        this.scaleFactor,
                        connectedRoad,
                        this.stepDistance,
                        false
                    );
                    this.cars[newCar.id] = newCar;
                    currEntryNode.timeSinceLastCarSpawn = 0;
                } else {
                    currEntryNode.timeSinceLastCarSpawn += 1;
                }
            }
        }

        return this.cars;
    }

    clearPaths(startNode, endPosition) {
        var roadsToClear = shortestPath(this.roadGraph, startNode, endPosition);
        this.endPosition = endPosition;
        for (var i = 0; i < roadsToClear.length; i++) {
            var currRoad = pathsToClear[i];
            currRoad.requiredTraffic = 0;
        }
        this.shortestPath = roadsToClear;
    }

    sendFireTruckNow() {
        this.fireTruck = new Car(
            this.shortestPath[this.fireTruckRoadIndex].startNode.position,
            this.scaleFactor,
            this.shortestPath[this.fireTruckRoadIndex],
            this.stepDistance,
            true
        );
    }
}
