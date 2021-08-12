import {
  format,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInSeconds,
  differenceInDays,
} from 'date-fns';

enum DateTypesEnum {
  DATE_AND_TIME,
  DATE,
  DATE_SHORT,
  TIME,
  DIFF,
}

export default function useFormat() {
  function formatDate(date?: string | number | null | Date, type = 'DATE_AND_TIME'): string | null {
    const isValidType = type in DateTypesEnum;
    if (!isValidType) {
      console.error('Invalid formatDate type, available -', DateTypesEnum);
      return null;
    }

    if (date) date = new Date(date);
    else date = new Date();

    const now = new Date();
    const isCurrentYear = now.getFullYear() === date.getFullYear();

    const msMinute = 60000;
    const msHour = 3600000;
    const msDay = 86400000;

    switch (type) {
      case 'DATE':
        return isCurrentYear ? format(date, 'MMMM d') : format(date, ' d MMMM YYYY');
      case 'DATE_SHORT':
        return isCurrentYear ? format(date, 'd.MM') : format(date, ' d.MM.YYYY');
      case 'TIME':
        return isCurrentYear ? format(date, 'kk:mm') : format(date, 'kk:mm');
      case 'DIFF': {
        const msDiff = differenceInMilliseconds(now, date);
        if (msDiff < msMinute) return `${differenceInSeconds(now, date)} секунд назад`;
        else if (msDiff < msHour) return `${differenceInMinutes(now, date)} минут назад`;
        else if (msDiff < msDay) return `${differenceInHours(now, date)} часов назад`;
        else return `${differenceInDays(now, date)} дней назад`;
      }
      default:
        return isCurrentYear ? format(date, 'MMMM d, kk:mm') : format(date, 'MMMM d YYYY, kk:mm');
    }
  }

  return {
    formatDate,
  };
}
