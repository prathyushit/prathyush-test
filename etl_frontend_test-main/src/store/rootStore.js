import AuthStore from "./authStore";
import PathStore from "./pathStore";
import DataStore from "./dataStore";

class RootStore {
  constructor() {
    this.authStore = new AuthStore(this);
    this.pathStore = new PathStore(this);
    this.dataStore = new DataStore(this);
  }
}

export const rootStore = new RootStore();
