//
//
//
// WEEK DATE TODAY
export const date = () => {
  const getStartOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - difference);

    return startOfWeek;
  };

  const formatMonthAndDate = (date: Date) => {
    const month = date.toLocaleString("en-us", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const getWeekDays = (startOfWeek: Date) => {
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(formatMonthAndDate(day));
    }

    return weekDays;
  };

  const startOfWeek = getStartOfWeek();
  const datesOfWeek = getWeekDays(startOfWeek);

  return datesOfWeek;
};

//
//
//
//
//
//
// PREVIOUS WEEK DATE
export const oldDate = () => {
  const getStartOfPreviousWeek = () => {
    const today = new Date();
    const previousDayOfWeek = new Date(today);

    const dayOfWeek = previousDayOfWeek.getDay();
    const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const previousDayOfWeekTimestamp =
      previousDayOfWeek.getTime() - (difference + 7) * 24 * 60 * 60 * 1000;
    previousDayOfWeek.setTime(previousDayOfWeekTimestamp);

    return previousDayOfWeek;
  };

  const formatMonthAndDate = (date: Date) => {
    const month = date.toLocaleString("en-us", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const getPreviousWeekDays = (startOfPreviousWeek: Date) => {
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfPreviousWeek);
      day.setDate(startOfPreviousWeek.getDate() + i);
      weekDays.push(formatMonthAndDate(day));
    }

    return weekDays;
  };

  const startOfPreviousWeek = getStartOfPreviousWeek();
  const previousDatesOfWeek = getPreviousWeekDays(startOfPreviousWeek);

  return previousDatesOfWeek;
};
