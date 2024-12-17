import { logoutUser } from "../service/authService";
import { removeFromLS } from "./storage";

export const performLogout = () => {
  logoutUser();
  removeFromLS("access_token");
  removeFromLS("id_token");
  removeFromLS("refresh_token");
  removeFromLS("email");

  window.location.href = "/sign-in";
};
