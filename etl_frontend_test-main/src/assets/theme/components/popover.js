import boxShadows from "../base/boxShadows";

import colors from "../base/colors";
import borders from "../base/borders";
import pxToRem from "../functions/pxToRem";

const { transparent } = colors;
const { lg } = boxShadows;
const { borderRadius } = borders;

const popover = {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: lg,
      padding: pxToRem(8),
      borderRadius: borderRadius.md,
    },
  },
};

export default popover;
