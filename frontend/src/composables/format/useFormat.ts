import { format } from 'date-fns';

enum DateTypesEnum {
  DATE_AND_TIME,
  DATE,
  DATE_SHORT,
  TIME,
}

export default function useFormat() {
  function formatDate(date?: string | number | null | Date, type = 'DATE_AND_TIME'): string | null {
    const isValidType = type in DateTypesEnum;
    console.log('is valid', isValidType);
    if (!isValidType) {
      console.error('Invalid formatDate type, available -', DateTypesEnum);
      return null;
    }

    if (date) date = new Date(date);
    else date = new Date();

    const isCurrentYear = new Date().getFullYear() === date.getFullYear();
    if (type === 'DATE') return isCurrentYear ? format(date, 'MMMM d') : format(date, ' d MMMM YYYY');
    if (type === 'DATE_SHORT') return isCurrentYear ? format(date, 'd.MM') : format(date, ' d.MM.YYYY');
    else if (type === 'TIME') return isCurrentYear ? format(date, 'kk:mm') : format(date, 'kk:mm');
    else return isCurrentYear ? format(date, 'MMMM d, kk:mm') : format(date, 'MMMM d YYYY, kk:mm');
  }

  return {
    formatDate,
  };
}
