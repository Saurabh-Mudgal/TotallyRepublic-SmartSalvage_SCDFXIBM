class Person {
    constructor(position, footPath, stepDistance, scaleFactor) {
        this.position = position;
        this.stepDistance = stepDistance;
        this.scaleFactor = scaleFactor;
        this.road = footPath;
        this.positive = Math.random() < 0.5 ? 1 : -1;
    }

    move() {
        if (this.footPath.type == "left") {
            newX = this.position.x + this.positive * this.stepDistance;
            if (newX > this.footPath.startNode.position.x) {
                newX = this.footPath.startNode.position.x;
            } else if (newX < this.footPath.endNode.position.x) {
                newX = this.footPath.endNode.position.x;
            }
            this.position.x = newX;
        } else {
            newY = this.position.y + this.positive * this.stepDistance;
            if (newY > this.footPath.startNode.position.y) {
                newY = this.footPath.startNode.position.y;
            } else if (newY < this.footPath.endNode.position.y) {
                newY = this.footPath.endNode.position.y;
            }
            this.position.y = newY;
        }
    }

    getPosition() {
        return {
            x: this.position.x * this.scaleFactor,
            y: this.position.y * this.scaleFactor,
        };
    }
    posString() {
        return JSON.stringify(this.position);
    }
}
