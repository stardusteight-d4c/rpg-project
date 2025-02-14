export const countTimeago = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const hours = Math.floor(diffInSeconds / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((diffInSeconds % 3600) / 60).toString().padStart(2, "0");
  const seconds = (diffInSeconds % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
