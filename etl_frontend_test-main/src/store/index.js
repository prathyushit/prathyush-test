import React from "react";
import { rootStore } from "./rootStore";

export const StoresContext = React.createContext(rootStore);

export const useStores = () => React.useContext(StoresContext);
