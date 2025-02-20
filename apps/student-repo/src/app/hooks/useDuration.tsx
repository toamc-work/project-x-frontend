import { useState, useEffect } from 'react';
import { Duration, intervalToDuration } from 'date-fns';

export const useDuration = (utcTimestamp:number) => {
  const [duration, setDuration] = useState<Duration>({});

  useEffect(() => {
    if (utcTimestamp) {
      // Convert to Date object
      const dateInUTC = new Date(utcTimestamp);

      // You can use dateInUTC for any further calculations if needed
      const durationObj = intervalToDuration({ start: 0, end: dateInUTC });
      setDuration(durationObj);
    }
  }, [utcTimestamp]);

  return duration;
};