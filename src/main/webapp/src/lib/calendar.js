export const calendarWeekDays = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat"
];

export const calendarMonths = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

export const currentDate = new Date();
export const currentMonth = currentDate.getMonth() + 1;

export const daysInMonth = month => {
  return (
    28 +
    (month + Math.floor(month / 8)) % 2 +
    2 % month +
    2 * Math.floor(1 / month)
  );
};

const offset =
  currentMonth === 1
    ? 0
    : Array.from(Array(currentMonth - 1))
        .map((_val, mon) => daysInMonth(mon + 1))
        .reduce((left, cur) => left + cur) % 7;

const daysInPrevMonth = daysInMonth(currentMonth - 1);
const daysInCurMonth = daysInMonth(currentMonth);
const prevMonth =
  currentMonth === 1
    ? []
    : Array.from(Array(daysInPrevMonth))
        .map((_val, day) => day + 1)
        .slice(daysInPrevMonth - offset, daysInPrevMonth);
const nextMonth = 35 - prevMonth.length - daysInCurMonth;

export const daysForWeekDay = (month, weekDay) =>
  [
    ...prevMonth,
    ...Array.from(Array(daysInCurMonth)).map((_val, day) => day + 1),
    ...Array.from(Array(nextMonth)).map((_val, day) => day + 1)
  ].filter((_day, i) => i % 7 === weekDay);

export const tagThemes = ["#27a9e8", "#63c799", "#f16737"];
