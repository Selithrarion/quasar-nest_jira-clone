import {
  format,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInSeconds,
  differenceInDays,
  differenceInMonths,
} from 'date-fns';

export enum DateTypes {
  DATE_AND_TIME = 'dateAndTime',
  DATE = 'date',
  DATE_SHORT = 'dateShort',
  TIME = 'time',
  DIFF = 'diff',
}
export enum DateUnits {
  MINUTE,
  HOUR,
  DAY,
  WEEK,
  MONTH,
}
interface DateFormatOptions {
  maxDiffUnit?: DateUnits;
}

export function useFormat() {
  function formatDate(
    date?: string | number | null | Date,
    type: DateTypes = DateTypes.DATE_AND_TIME,
    options: DateFormatOptions = {}
  ): string | null {
    if (date) date = new Date(date);
    else date = new Date();

    const now = new Date();
    const isCurrentYear = now.getFullYear() === date.getFullYear();

    const msMinute = 60000;
    const msHour = 3600000;
    const msDay = 86400000;
    const msMonth = 2678400000;

    switch (type) {
      case 'date':
        return isCurrentYear ? format(date, 'MMMM d') : format(date, ' d MMMM YYYY');

      case 'dateShort':
        return isCurrentYear ? format(date, 'd.MM') : format(date, ' d.MM.YYYY');

      case 'time':
        return isCurrentYear ? format(date, 'kk:mm') : format(date, 'kk:mm');

      case 'diff': {
        // TODO: not natural lang pluralization (one, few, plural in russian and one, plural in english...)
        // vue-i18n
        const msDiff = differenceInMilliseconds(now, date);

        const isSeconds = msDiff < msMinute;
        const isMinutes = msDiff < msHour && options.maxDiffUnit !== DateUnits.MINUTE;
        const isHours = msDiff < msDay && options.maxDiffUnit !== DateUnits.HOUR;
        const isDays = msDiff < msMonth && options.maxDiffUnit !== DateUnits.DAY;
        const isMonths = options.maxDiffUnit !== DateUnits.MONTH;

        if (isSeconds) return `${differenceInSeconds(now, date) || 1} секунд назад`;
        else if (isMinutes) return `${differenceInMinutes(now, date) || 1} минут назад`;
        else if (isHours) return `${differenceInHours(now, date) || 1} часов назад`;
        else if (isDays) return `${differenceInDays(now, date) || 1} дней назад`;
        else if (isMonths) return `${differenceInMonths(now, date) || 1} месяцев назад`;
        else return isCurrentYear ? format(date, 'MMMM d, kk:mm') : format(date, 'MMMM d YYYY, kk:mm');
      }

      default:
        return isCurrentYear ? format(date, 'MMMM d, kk:mm') : format(date, 'MMMM d YYYY, kk:mm');
    }
  }

  return {
    formatDate,
  };
}
