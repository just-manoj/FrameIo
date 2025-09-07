export const timeHhMm = (time: string) => {
  if (!time) {
    return '';
  }
  const timeObj = new Date(time);
  return timeObj.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const timeMmSs = (time: string) => {
  if (!time) {
    return 0;
  }
  return parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
};

export const secToMin = (t: number) => {
  if (!t || t < 0) {
    return '00:00';
  }
  const s = Math.round(t);
  const min = Math.floor(s / 60);
  const sec = s % 60;

  const mm = String(min).padStart(2, '0');
  const ss = String(sec).padStart(2, '0');
  return `${mm}:${ss}`;
};

export const generateTimeStamp = (seconds: number) => {
  if (seconds < 0) {
    return [];
  }

  const timestamp = [];

  for (var i = seconds; i > 0; i--) {
    const min = String(Math.floor(i / 60)).padStart(2, '0');
    const sec = String(i % 60).padStart(2, '0');
    timestamp.push({ label: `${min}:${sec}`, value: `${min}:${sec}` });
  }

  return timestamp;
};
