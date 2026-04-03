import { useState, useEffect, useRef } from "react";

export function useCountdown() {
  const endRef = useRef<number>(
    Date.now() + (23 * 3600 + 47 * 60 + 12) * 1000
  );
  const [time, setTime] = useState({ h: "23", m: "47", s: "12" });

  useEffect(() => {
    const tick = () => {
      const dist = endRef.current - Date.now();
      if (dist < 0) {
        endRef.current = Date.now() + 24 * 3600 * 1000;
        return;
      }
      setTime({
        h: String(Math.floor(dist / 3600000)).padStart(2, "0"),
        m: String(Math.floor((dist % 3600000) / 60000)).padStart(2, "0"),
        s: String(Math.floor((dist % 60000) / 1000)).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function useLiveCounter() {
  const [viewers, setViewers] = useState(312);
  const [openers, setOpeners] = useState(54);

  useEffect(() => {
    const id = setInterval(() => {
      setViewers((v) => {
        const next = v + Math.floor(Math.random() * 5 - 2);
        return Math.min(380, Math.max(280, next));
      });
      if (Math.random() > 0.6) setOpeners((o) => o + 1);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return { viewers, openers };
}