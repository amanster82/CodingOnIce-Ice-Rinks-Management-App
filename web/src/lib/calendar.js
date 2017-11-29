import store from "lib/store";

function getCurrentMonth() {
  return store.getState().rinks.currentMonth;
}

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

export const daysInMonth = month => {
  return (
    28 +
    (month + Math.floor(month / 8)) % 2 +
    2 % month +
    2 * Math.floor(1 / month)
  );
};

const offset = month =>
  month === 1
    ? 0
    : Array.from(Array(month - 1))
        .map((_val, mon) => daysInMonth(mon + 1))
        .reduce((left, cur) => left + cur) % 7;

const daysInPrevMonth = month => daysInMonth(month - 1);
const daysInCurMonth = month => daysInMonth(month);
const prevMonth = month =>
  month === 1
    ? []
    : Array.from(Array(daysInPrevMonth(month)))
        .map((_val, day) => day + 1)
        .slice(daysInPrevMonth(month) - offset(month), daysInPrevMonth(month));
const nextMonth = month =>
  month >= 12 ? 0 : 35 - prevMonth(month).length - daysInCurMonth(month);

export const daysForWeekDay = (month, weekDay) =>
  [
    ...prevMonth(month),
    ...Array.from(Array(daysInCurMonth(month))).map((_val, day) => day + 1),
    ...Array.from(Array(nextMonth(month))).map((_val, day) => day + 1)
  ].filter((_day, i) => i % 7 === weekDay);

export const tagThemes = ["#27a9e8", "#63c799", "#f16737"];

export const times = (day, startHour, endHour) =>
  [...Array.from(Array(endHour - startHour)).map((_v, i) => i + startHour)].map(
    hour => {
      return new Date(2017, getCurrentMonth(), day, hour, 0, 0, 0);
    }
  );

export function prettyDateInterval(
  time,
  intervalPrefix = "in",
  intervalPostfix = ""
) {
  var date = time;

  if (typeof date === "string") {
    date = new Date(date);
  }

  let diff = Math.abs((new Date().getTime() - date.getTime()) / 1000);

  var day_diff = Math.floor(Math.abs(diff) / 86400);

  if (isNaN(day_diff)) return;

  const week_diff = Math.ceil(day_diff / 7);
  const month_diff = Math.ceil(day_diff / 30);

  return (
    (day_diff == 0 &&
      ((diff < 60 && "just now") ||
        (diff < 120 && "a minute ago") ||
        (diff < 3600 && Math.floor(diff / 60) + ` minutes${intervalPostfix}`) ||
        (diff < 7200 && `about an hour${intervalPostfix}`) ||
        (diff < 86400 &&
          `about ${Math.floor(diff / 3600)} hours${intervalPostfix}`))) ||
    (day_diff < -7 &&
      `${intervalPrefix} ${Math.abs(diff)} days${intervalPostfix}`) ||
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

  return `${calendarMonths[date.getMonth() + 1].slice(
    0,
    3
  )} ${date.getDate()}, ${date.getFullYear()} ${
    date.getHours() < 10 ? "0" : ""
  }${date.getHours()}:${date.getMinutes()}${date.getMinutes() < 10 ? "0" : ""}`;
}
