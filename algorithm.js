class Car {
    constructor(position, scaleFactor, road, stepDistance) {
        this.position = loc;
        this.scaleFactor = scaleFactor;
        this.road = road;
        this.stepDistance = stepDistance;
    }

    move() {
        if (this.road.roadType == "left") {
            newX = this.position.x - stepDistance * this.scaleFactor;
            if (newX <= this.endNode.x) {
                newX = this.endNode.x;
            }
            this.position.x = newX;
            return this.position;
        } else {
            newY = this.position.y - this.stepDistance * this.scaleFactor;
            if (newY <= this.endNode.y) {
                newY = this.endNode.y;
            }
            this.position.y = newY;
            return this.position;
        }
    }
}

class Road {
    constructor(startNode, endNode, scaleFactor) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.currTraffic = 0;
        this.cars = [];
        this.roadType =
            startNode.position.x - endNode.position.x == 0 ? "down" : "left";
        if (this.roadType == "down") {
            this.roadLength = Math.abs(startNode.y - endNode - y) * scaleFactor;
        } else {
            this.roadLength = Math.abs(startNode.x - endNode.x) * scaleFactor;
        }
    }

    addCar(car) {
        this.cars.push(car);
        this.currTraffic += 1;
    }

    removeCar() {
        if (this.cars.length != 0) {
            this.cars = this.cars.slice(1, this.cars.length);
            this.currTraffic -= 1;
        }
    }
}
