class Road {
    constructor(startNode, endNode, scaleFactor, requiredTraffic) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.currTraffic = 0;
        this.requiredTraffic = requiredTraffic;
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
        car.road = this;
    }

    removeCar() {
        if (this.cars.length != 0) {
            this.cars[0].road = null;
            this.cars = this.cars.slice(1, this.cars.length);
            this.currTraffic -= 1;
        }
    }

    changeRequiredTraffic(newRequiredTraffic) {
        this.requiredTraffic = newRequiredTraffic;
    }
}
