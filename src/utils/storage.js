const STORAGE_KEY = "nosoda-data";

export function getData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data
    ? JSON.parse(data)
    : {
        lastCheckInDate: null,
        currentStreak: 0,
        bestStreak: 0,
        history: [],
      };
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
