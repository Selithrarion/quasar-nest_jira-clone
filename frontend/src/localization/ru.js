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
    detail: 'Подробнее',
    share: 'Поделиться',
    send: 'Отправить',
    skip: 'Пропустить',
    back: 'Назад',
    notAssigned: 'Не назначено',
    lastUpdates: 'Последние обновления',
    clearAll: 'Очистить всё',
    or: 'или',
    code: 'Код',
    notifications: 'Уведомления',
    help: 'Помощь',
    settings: 'Настройки',
    createIssue: 'Создать задачу',
    noResults: 'Результатов нет',
    summary: 'Резюме',
    title: 'Название',
    description: 'Описание',
    giveReview: 'Оставить отзыв',
    addTitle: 'Добавить название',
    changeTitle: 'Изменить название',
    activity: 'Активность',
    addComment: 'Добавить комментарий...',
    advice: 'Совет',
    press: 'нажмите',
    toAddComment: 'чтобы добавить комментарий',
    edited: 'Изменено',
    edit: 'Изменить',
    created: 'Создрано',
    updateDate: 'Дата обновления',
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
    project: 'Проект',
    projects: 'Проекты',

    companyManage: 'Программное обеспечение, управляемое компанией',
    teamManage: 'Программное обеспечение, управляемое командой',

    chooseType: 'Выберите тип проекта',
    create: 'Создать проект',
    delete: 'Этот проект и его конфигурация будут удалены без возможности восстановления.',
    settings: 'Настройки проекта',
    trash: 'Переместить в коризну',

    board: 'Доска',
    softwareDevProject: 'Проект по разработке ПО',
    companyType: 'Это проект управляемый компанией',

    automation: 'Автоматизация',
    markBoard: 'Пометить доску',
    newVersion: 'Новая версия',
    enterNameTeamOrEmail: 'Введите имя, команду или адрес эл. почты',
    enterMessage: 'Введите сообщение',
    copyLink: 'Копировать ссылку',
    onlyMyTasks: 'Только мои задачи',
    release: 'Выпуск',

    noCurrentIssues: 'Нет видимых текущих задач',
    createIssue: 'Создайте задачу',
    orCheck: 'или проверьте',
    boardSettings: 'настройки доски',
    importIssues: 'Импортировать задачи',
    configureFields: 'Настроить поля',

    assigned: 'Исполнитель',
    issueType: 'Тип задачи',
    marks: 'Метки',
    addMarks: 'Добавить метки',
    assignToMe: 'Назначить мне',
    changeIssueType: 'изменить тип задачи',
    editAssigned: 'Изменить исполнителя',
    author: 'Автор',
    editAuthor: 'Изменить автора',
    priority: 'Приоритет',
    editPriority: 'Изменить приоритет',
    openSettings: 'Открыть диалог настроек',
    configure: 'Настроить',
    deleteComment: 'Удалить комментарий?',
    deleteCommentFrom: 'Удалить комментарий от {n}',
  },

  people: {
    members: '0 участников | {n} участник | {n} участника | {n} участников',
    yourNewTeam: 'Ваша новая команда!',
    createTeam: 'Создайте новую команду',
  },

  user: {
    displayName: 'Отображаемое имя',
    username: 'Имя пользователя',
    email: 'Email',
    password: 'Пароль',
    confirmEmail: 'Подтвердите пароль',
    profile: 'Профиль',
    displayNameUsernameOrEmail: 'Их отображаемое имя, имя пользователя или email',
    max10Users: 'Вы можете пригласить не более 10 пользователей за раз.',
  },

  auth: {
    register: 'Зарегистрироваться',
    registerJiraAccount: 'Создать новый аккаунт Jira',
    resetPassword: 'Восстановить пароль',
    signIn: 'Войти',
    signOut: 'Выйти',
    signInJira: 'Войти в аккаунт Jira',
    scanQrCode: 'Сканируйте QR-код с помощью приложения Google Authenticator и введите код в поле ниже',
    enter2FaCode: 'Введите код из приложения Google Authenticator',
    incorrect2FaCode: 'Неверный код, попробуйте снова',
    recoverPassword: 'Восстановить пароль от аккаунта Jira',
    sendEmail: 'Отправить Email',
    passwordNotMatch: 'Пароли не совпадают',
  },

  validation: {
    required: 'Обязательное поле',
    incorrectEmailFormat: 'Неверный формат Email',
    usernameTaken: 'Имя пользователя уже занято',
    emailTaken: 'Такой email уже зарегистрирован',
    minChars: 'Минимум 0 символов | Минимум {n} символ | Минимум {n} символа | Минимум {n} символов',
    maxChars: 'Максимум 0 символов | Максимум {n} символ | Максимум {n} символа | Максимум {n} символов',
  },

  tabs: {
    work: 'Ваша работа',
    projects: 'Проекты',
    filters: 'Фильтры',
    dashboards: 'Дашбоарды',
    people: 'Люди',
    apps: 'Приложения',
  },

  date: {
    secondsAgo: '0 секунд назад | {n} секунду назад | {n} секунды назад | {n} секунд назад',
    minutesAgo: '0 минут назад | {n} минуту назад | {n} минуты назад | {n} минут назад',
    hoursAgo: '0 час назад | {n} час назад | {n} часа назад | {n} часов назад',
    daysAgo: '0 день назад| {n} день назад | {n} дня назад | {n} дней назад',
    monthsAgo: '0 месяц назад | {n} месяц назад | {n} месяца назад | {n} месяцев назад',
  },

  table: {
    name: 'Имя',
    key: 'Ключ',
    type: 'Тип',
    leader: 'Руководитель',
    group: 'Группа',
    owner: 'Владелец',
    resetFilters: 'Сбросить фильтры',
  },
};
