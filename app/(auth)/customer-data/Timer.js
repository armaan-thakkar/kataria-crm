'use client';  
import { useState, useEffect } from 'react';

export default function SimpleTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isFiveMinPhase, setIsFiveMinPhase] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        const limit = isFiveMinPhase ? 5 * 60 : 10 * 60;

        if (prev + 1 >= limit) {
          setIsFiveMinPhase(!isFiveMinPhase); // toggle phase
          return 0; // reset timer
        }

        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isFiveMinPhase]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  return (
    <div >
      <div>{minutes}:{secs}</div>
    </div>
  );
}
