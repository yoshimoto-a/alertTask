export const calculateTargetDateTime = (
  date: Date,
  daysBefore: number,
  hour: number
) => {
  const targetDate = new Date(date);
  targetDate.setDate(targetDate.getDate() - daysBefore);

  targetDate.setHours(hour);

  return targetDate;
};
