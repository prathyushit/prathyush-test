import { makeAutoObservable, runInAction } from "mobx";
import {
  forgotPasswordUser,
  loginUser,
  resetPasswordUser,
  refreshTokenUser,
} from "../service/authService";
import { setItemToLS } from "../config/storage";

class AuthStore {
  isLoading = false;
  token = null;
  errorMsg = null;
  email = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    this.isLoading = false;
    this.token = null;
    this.errorMsg = null;
  }

  async login(credentials) {
    try {
      this.isLoading = true;
      const session = await loginUser(credentials);

      const accessToken = session.getAccessToken().getJwtToken();
      const idToken = session.getIdToken().getJwtToken();
      const refreshToken = session.getRefreshToken().getToken();

      runInAction(() => {
        this.isLoading = false;
        this.token = accessToken;
        this.errorMsg = null;
      });

      this.setToken({ accessToken, idToken, refreshToken });
      this.setEmail(credentials.email);

      return this.token;
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.message;
      });
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      this.isLoading = true;
      const data = await forgotPasswordUser(email);

      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = null;
        this.email = email;
      });

      return data;
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.message;
      });
    }
  }

  async resetPassword(credentials) {
    try {
      this.isLoading = true;
      const data = await resetPasswordUser(credentials, this.email);

      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = null;
      });

      return data;
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.message;
      });
    }
  }

  async refreshToken() {
    try {
      this.isLoading = true;
      const session = await refreshTokenUser();

      const accessToken = session.getAccessToken().getJwtToken();
      const idToken = session.getIdToken().getJwtToken();
      const refreshToken = session.getRefreshToken().getToken();

      this.setToken({ accessToken, idToken, refreshToken });

      runInAction(() => {
        this.isLoading = false;
        this.token = accessToken;
        this.errorMsg = null;
      });

      return session;
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.message;
      });
    }
  }

  clearError() {
    this.errorMsg = null;
  }

  setToken({ accessToken, idToken, refreshToken }) {
    setItemToLS("access_token", accessToken);
    setItemToLS("id_token", idToken);
    setItemToLS("refresh_token", refreshToken);
    window.dispatchEvent(new Event("storageChange"));
  }

  setEmail(email) {
    setItemToLS("email", email);
  }
}

export default AuthStore;
