const listItem = {
  // defaultProps: {
  //   disableGutters: true,
  // },

  styleOverrides: {
    root: {
      paddingTop: 0,
      paddingBottom: 0,
      color: "#ffffff",
      "&.selected": {
        backgroundColor: "#ffffff",
      },
      "&.selected .MuiListItemText-primary": {
        color: "#1976d2",
      },
    },
  },
};

export default listItem;
