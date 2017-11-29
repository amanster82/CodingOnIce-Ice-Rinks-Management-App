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

export const times = (day, startHour, endHour) =>
[...Array.from(Array(endHour - startHour)).map((_v, i) => i + startHour)].map(hour => {
  return new Date(2017, currentMonth, day, hour, 0, 0, 0);
});

export function prettyDateInterval(time, intervalPrefix = "in", intervalPostfix = "") {
  var date = time;

  if (typeof date === "string") {
    date = new Date(date);
  }

  let diff = (diff = (new Date().getTime() - date.getTime()) / 1000);

  var day_diff = Math.floor(Math.abs(diff) / 86400);

  if (isNaN(day_diff)) return;

  const week_diff = Math.ceil(day_diff / 7);
  const month_diff = Math.ceil(day_diff / 30);

  return (
    (day_diff == 0 &&
      (
        (diff < 60 && "just now") ||
        (diff < 120 && "a minute ago") ||
        (diff < 3600 && Math.floor(diff / 60) + ` minutes${intervalPostfix}`) ||
        (diff < 7200 && `about an hour${intervalPostfix}`) ||
        (diff < 86400 && `about ${Math.floor(diff / 3600)} hours${intervalPostfix}`))) ||
    (day_diff < -7 && `${intervalPrefix} ${Math.abs(diff)} days${intervalPostfix}`) ||
    (day_diff == -1 && `${intervalPrefix} a day${intervalPostfix}`) ||
    (day_diff == 1 && `a day${intervalPostfix}`) ||
    (day_diff < 7 && day_diff + ` days${intervalPostfix}`) ||
    (day_diff < 31 &&
      `${week_diff === 1 ? "a" : week_diff} week${
        week_diff === 1 ? "" : "s"
      }`) ||
    `${month_diff === 1 ? "a" : month_diff} month${month_diff === 1 ? "" : "s"}`
  );
}

export function prettyDateAbsolute(start) {

  const date = typeof start === "string" ? new Date(start) : start;

  return `${calendarMonths[date.getMonth()+1].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
};