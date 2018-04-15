export const getIdFromStorage = localStorage.getItem.bind(
  localStorage,
  "playerId"
);

export const saveIdToStorage = localStorage.setItem.bind(
  localStorage,
  "playerId"
);
