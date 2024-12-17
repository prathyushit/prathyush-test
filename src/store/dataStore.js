import { makeAutoObservable, runInAction } from "mobx";
import {
  getBuckets,
  validateFiles,
  transformFiles,
  downloadFiles,
} from "../service/dataService";

class DataStore {
  selectedBucket = "";
  selectedFormat = "FHIR XML Format";
  buckets = [];
  step = 0;
  validated = false;
  converted = false;

  isLoading = false;
  isValidateLoading = false;
  isTransformLoading = false;
  isDownloadLoading = false;

  validateStatusMsg = null;
  convertStatusMsg = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getBuckets() {
    try {
      this.isLoading = true;
      const data = await getBuckets();
      this.buckets = JSON.parse(data);
      runInAction(() => {
        this.isLoading = false;
        this.statusMsg = null;
      });
    } catch (error) {
      console.log("error ===>", error);
      runInAction(() => {
        this.isLoading = false;
        this.statusMsg = error;
      });
    }
  }

  async validateFiles() {
    try {
      this.isValidateLoading = true;
      this.validateStatusMsg = null;
      const response = await validateFiles(this.selectedBucket);

      runInAction(() => {
        this.isValidateLoading = false;
        this.validateStatusMsg = JSON.parse(response);
        this.validated = true;
        this.step = 2;
      });
    } catch (error) {
      runInAction(() => {
        this.isValidateLoading = false;
        this.validateStatusMsg = error;
      });
    }
  }

  async transformFiles() {
    try {
      this.isTransformLoading = true;
      this.convertStatusMsg = null;
      const response = await transformFiles(
        this.selectedBucket,
        this.selectedFormat
      );

      runInAction(() => {
        this.isTransformLoading = false;
        this.convertStatusMsg = response;
        this.converted = true;
        this.step = 3;
      });
    } catch (error) {
      runInAction(() => {
        this.isTransformLoading = false;
        this.convertStatusMsg = error;
      });
    }
  }

  async downloadFiles() {
    try {
      this.isDownloadLoading = true;
      this.statusMsg = null;
      const response = await downloadFiles(this.selectedBucket);

      runInAction(() => {
        this.isDownloadLoading = false;
        this.statusMsg = response;
      });
    } catch (error) {
      runInAction(() => {
        this.isDownloadLoading = false;
        this.statusMsg = error;
      });
    }
  }

  changeBucket(bucket) {
    this.selectedBucket = bucket;
  }

  changeStep(step) {
    this.step = step;
  }

  resetState() {
    this.selectedBucket = "";
    this.validateStatusMsg = null;
    this.step = 0;
    this.convertStatusMsg = null;
    this.validated = false;
    this.converted = false;
  }
}

export default DataStore;
