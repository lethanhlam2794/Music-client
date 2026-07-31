/**
 * Format time in seconds to MM:SS format
 * @param time - Time in seconds
 * @returns Formatted time string (e.g., "3:45")
 */
export function formatTime(time: number): string {
  if (!time || isNaN(time) || time < 0) {
    return "0:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

/**
 * Format time in seconds to HH:MM:SS format for longer durations
 * @param time - Time in seconds
 * @returns Formatted time string (e.g., "1:23:45")
 */
export function formatTimeLong(time: number): string {
  if (!time || isNaN(time) || time < 0) {
    return "0:00:00";
  }

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  if (hours === 0) {
    return formatTime(time);
  }

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}