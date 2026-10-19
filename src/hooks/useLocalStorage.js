import { useEffect, useState } from "react";

// Works like useState, but remembers the value in the browser
// so your data is still there after a refresh.
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore broken or blocked storage and fall back to the default
    }
    return typeof initial === "function" ? initial() : initial;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage can be full or disabled; the app still works without it
    }
  }, [key, value]);

  return [value, setValue];
}
