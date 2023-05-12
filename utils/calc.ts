export const calcAge = (date: string) => {
  const now: any = new Date();
  const formatDate: any = new Date(date);
  const ageInMilliseconds = now - formatDate;
  const ageInSeconds = ageInMilliseconds / 1000;
  const ageInMinutes = ageInSeconds / 60;
  const ageInHours = ageInMinutes / 60;
  const ageInDays = ageInHours / 24;
  const ageInYears = ageInDays / 365;

  return Math.round(ageInYears) === 1
    ? { year: Math.round(ageInYears) }
      ? ageInYears > 1
      : { years: Math.round(ageInYears) }
    : Math.round(ageInDays) === 1
    ? { day: Math.round(ageInDays) }
    : ageInDays > 1
    ? { days: Math.round(ageInDays) }
    : Math.round(ageInHours) === 1
    ? { hour: Math.round(ageInHours) }
    : ageInHours > 1
    ? { hours: Math.round(ageInHours) }
    : Math.round(ageInMinutes) === 1
    ? { minute: Math.round(ageInMinutes) }
    : ageInMinutes > 1
    ? { minutes: Math.round(ageInMinutes) }
    : null;
};
