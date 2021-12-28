const env = process.env.NODE_ENV;

export const get = (key: string): Promise<unknown> =>
  new Promise((resolve) => {
    if (env === "development") {
      const response = localStorage.getItem(key);
      resolve(response ? JSON.parse(response) : null);
      return;
    }
    chrome.storage.sync.get([key], (result: Record<string, unknown>) =>
      resolve(result[key])
    );
  });

export const set = (object: Record<string, unknown>): Promise<void> =>
  new Promise((resolve) => {
    if (env === "development") {
      Object.entries(object).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
      return resolve();
    }
    chrome.storage.sync.set(object, () => resolve());
  });

export const subscribe = (
  key: string,
  cb: (changes: Record<string, unknown>) => void
): Promise<void> =>
  new Promise((resolve) => {
    if (env === "development") {
      window.addEventListener("storage", (event) => {
        if (event.key === key) {
          cb(event.newValue ? JSON.parse(event.newValue) : null);
        }
      });
      return resolve();
    }
    chrome.storage.onChanged.addListener((changes, areaName: string) => {
      if (areaName === "sync" && Object.keys(changes).includes(key)) {
        cb(changes[key].newValue);
      }
    });
  });
