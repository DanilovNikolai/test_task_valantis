export default function getLocalDate(): string {
  const currentDate: Date = new Date();
  const year: string = String(currentDate.getFullYear());
  const month: string = String(currentDate.getMonth() + 1)
    .padStart(2, "0")
    .slice(-2);
  const day: string = String(currentDate.getDate()).padStart(2, "0").slice(-2);

  const localDate = `${year}${month}${day}`;

  return localDate;
}
