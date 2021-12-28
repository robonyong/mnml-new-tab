const env = process.env.NODE_ENV;

export const get = (key: string) =>
  new Promise((resolve) => {
    if (env === "development") {
      const response = localStorage.getItem(key);
      resolve(response ? JSON.parse(response) : null);
      return;
    }
    chrome.storage.sync.get([key], (result: any) => resolve(result[key]));
  });

export const set = (object: Object) =>
  new Promise<void>((resolve) => {
    if (env === "development") {
      Object.entries(object).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
      return resolve();
    }
    chrome.storage.sync.set(object, () => resolve());
  });

export const subscribe = (key: string, cb: (changes: any) => void) =>
  new Promise<void>((resolve) => {
    if (env === "development") {
      window.addEventListener("storage", (event) => {
        if (event.key === key) {
          cb(event.newValue ? JSON.parse(event.newValue) : null);
        }
      });
      return resolve();
    }
    chrome.storage.onChanged.addListener(
      (changes: { [key: string]: any }, areaName: string) => {
        if (areaName === "sync" && Object.keys(changes).includes(key)) {
          cb(changes[key].newValue);
        }
      }
    );
  });
