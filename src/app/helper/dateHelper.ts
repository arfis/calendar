export function transformMinutesToMs(minutes) {
  return minutes * 60 * 1000;
}

export function convertTimeToString(timeInMs) {
  const seconds = timeInMs / 1000;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  let displayMinutes = String(minutes % 60);
  let displayHours = String(hours % 24);

  displayMinutes = displayMinutes.length === 1 ? `0${displayMinutes}` : displayMinutes;
  displayHours = displayHours.length === 1 ? `0${displayHours}` : displayHours;

  return `${displayHours}:${displayMinutes}`;
}

export function convertTimeToMs(time) {
  if (time.length === 5) {
    const hours = time.substring(0, 2);
    const minutes = time.substring(3, 5);

    return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
  } else {
    return null;
  }
}

export const dayInMs = 24 * 60 * 60 * 1000;

export function lastArrayIndex(array) {
  return array.length - 1;
}

export const enum MonthType {
  PREVIOUS, NEXT, CURRENT
}
