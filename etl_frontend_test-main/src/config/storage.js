export const setItemToLS = (itemKey, body) => {
  return localStorage.setItem(itemKey, JSON.stringify(body));
};

export const getItemFromLS = (itemKey) => {
  let ItemFromLs = localStorage.getItem(itemKey);
  return (ItemFromLs = JSON.parse(ItemFromLs));
};

export const removeFromLS = (itemKey) => {
  localStorage.removeItem(itemKey);
};
