export function russianPluralization(choice, choicesLength) {
  if (choice === 0) return 0;

  const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;
  if (!teen && endsWithOne) return 1;

  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) return 2;

  return choicesLength < 4 ? 2 : 3;
}

export default {
  common: {
    delete: 'Удалить',
    open: 'Открыть',
    create: 'Создать',
    confirm: 'Подтвердить',
    cancel: 'Отмена',
    close: 'Закрыть',
  },

  work: {
    title: 'Ваша работа',
    recent: 'Недавние проекты',
    all: 'Все проекты',
    open: 'Открыть страницу проектов',
    openProject: 'Открыть проект',
    noProjects: 'Проектов нет',
    boards: '0 досок | {n} доска | {n} доски | {n} досок',
  },

  email: {
    confirmSuccess: 'Вы успешно подтвердили свой Email',
    confirmResend: 'Письмо было отправлено повторно на вашу почту',
    confirmError:
      'Что-то пошло не так и Email не был подтверждён. Возможно ссылка подтверждения истекла или Email уже подтверждён',
    resend: 'Отправить ещё раз',
  },

  project: {
    companyManage: 'Программное обеспечение, управляемое компанией',
    teamManage: 'Программное обеспечение, управляемое командой',
    projects: 'Проекты',
    create: 'Создать проект',
    chooseType: 'Выберите тип проекта',
  },

  people: {
    members: '0 участников | {n} участник | {n} участника | {n} участников',
  },

  date: {
    secondsAgo: '0 секунд назад | {n} секунду назад | {n} секунды назад | {n} секунд назад',
    minutesAgo: '0 минут назад | {n} минуту назад | {n} минуты назад | {n} минут назад',
    hoursAgo: '0 час назад | {n} час назад | {n} часа назад | {n} часов назад',
    daysAgo: '0 день назад| {n} день назад | {n} дня назад | {n} дней назад',
    monthsAgo: '0 месяц назад | {n} месяц назад | {n} месяца назад | {n} месяцев назад',
  },
};
