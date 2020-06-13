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
