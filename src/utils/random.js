import MersenneTwister from "mersennetwister";

export default class Random {
  constructor(seed = Date.now()) {
    this.seed = seed;
    this.internal = new MersenneTwister(seed);
  }
  next(max) {
    return max ? this.internal.int() % max : this.internal.int();
  }
}
