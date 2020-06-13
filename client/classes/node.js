class Node {
  constructor(location, rate, neighbours) {
    this.location = location;
    // rate of objects entering node
    this.rate = rate;
    // array of road objects
    this.neighbours = neighbours;
  }
  posString() {
    return JSON.stringify(this.location);
  }
}
