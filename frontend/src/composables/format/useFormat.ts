import {
  format,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInSeconds,
  differenceInDays,
  differenceInMonths,
} from 'date-fns';
import { useI18n } from 'vue-i18n';

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
  const { t } = useI18n();

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
        const msDiff = differenceInMilliseconds(now, date);

        const isSeconds = msDiff < msMinute;
        const isMinutes = msDiff < msHour && options.maxDiffUnit !== DateUnits.MINUTE;
        const isHours = msDiff < msDay && options.maxDiffUnit !== DateUnits.HOUR;
        const isDays = msDiff < msMonth && options.maxDiffUnit !== DateUnits.DAY;
        const isMonths = options.maxDiffUnit !== DateUnits.MONTH;

        if (isSeconds) return t('date.secondsAgo', differenceInSeconds(now, date));
        else if (isMinutes) return t('date.minutesAgo', differenceInMinutes(now, date));
        else if (isHours) return t('date.hoursAgo', differenceInHours(now, date));
        else if (isDays) return t('date.daysAgo', differenceInDays(now, date));
        else if (isMonths) return t('date.monthsAgo', differenceInMonths(now, date));
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
