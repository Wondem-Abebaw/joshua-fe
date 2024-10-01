export function dateFormat(data: any) {
  let date;
  if (typeof data === "string") {
    date = Date.parse(data);
  } else {
    date = data;
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}
