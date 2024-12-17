import { makeAutoObservable } from "mobx";

class PathStore {
  selectedStep = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async changePath(step) {
    this.selectedStep = step;
  }
}

export default PathStore;
