export default {
  common: {
    delete: 'Delete',
    open: 'Open',
    create: 'Create',
    confirm: 'Confirm',
    cancel: 'Cancel',
    close: 'Close',
    detail: 'Details',
    share: 'Details',
    send: 'Send',
    skip: 'Skip',
    back: 'Back',
    notAssigned: 'Not assigned',
    lastUpdates: 'Last Updates',
    clearAll: 'Clear all',
    or: 'or',
    code: 'Code',
    help: 'Help',
    settings: 'Settings',
    createIssue: 'Create Issu',
    noResults: 'There are no results',
    summary: 'Summary',
    title: 'Title',
    description: 'Description',
    giveReview: 'Give feedback',
    addTitle: 'Add Title',
    changeTitle: 'Change Title',
    activity: 'Activity',
    addComment: 'Add comment ...',
    advice: 'Advice',
    press: 'press',
    toAddComment: 'to add a comment',
    edited: 'edited',
    edit: 'Edit',
    created: 'Created',
    updateDate: 'Update date',
    thereNoAnything: 'There is nothing here',
  },

  work: {
    title: 'Your work',
    recent: 'Recent projects',
    all: 'All projects',
    open: 'Open the projects page',
    openProject: 'Open Project',
    noProjects: 'There are no projects',
    boards: '0 boards | {n} board | {n} boards | {n} boards',
  },

  email: {
    confirmation: 'Email Confirmation',
    confirmSuccess: 'You have successfully confirmed your Email',
    confirmResend: 'Email was resent to your email',
    confirmError:
      'Something went wrong and the Email was not confirmed. Perhaps the confirmation link has expired or the Email has already been verified',
    resend: 'Send again',
  },

  project: {
    project: 'Project',
    projects: 'Projects',

    kanbanDescription:
      'Get a visual representation of your work on a project with simple prompts and a feature board.',
    scrumDescription: 'Achieve your goals faster with a modern whiteboard and backlog.',
    companyManage: 'Company Managed Software',
    teamManage: 'Team Managed Software',

    chooseType: 'Choose Project Type',
    create: 'Create Project',
    delete: 'This project and its configuration will be permanently deleted.',
    settings: 'Project settings',
    trash: 'Move to trash',

    board: 'Board',
    softwareDevProject: 'Software Development Project',
    companyType: 'This is a company operated project',

    automation: 'Automation',
    markBoard: 'Mark board',
    newVersion: 'New Version',
    enterNameTeamOrEmail: 'Enter name, command or email. mail',
    enterMessage: 'Enter message',
    copyLink: 'Copy link',
    onlyMyTasks: 'Only my tasks',
    release: 'Release',

    noCurrentIssues: 'There are no current tasks visible',
    createIssue: 'Create an issue',
    orCheck: 'or check',
    boardSettings: 'board settings',
    importIssues: 'Import Issues',
    configureFields: 'Configure fields',

    assigned: 'Executor',
    marks: 'Marks',
    addMarks: 'Add Marks',
    assignToMe: 'Assign to me',
    changeIssueType: 'change issue type',
    editAssigned: 'Change Artist',
    author: 'Author',
    editAuthor: 'Change author',
    openSettings: 'Open Settings Dialog',
    configure: 'Configure',
    deleteComment: 'Delete comment?',
    deleteCommentFrom: 'Delete comment from {n}',

    issueType: {
      issueType: 'Issue type',
      bug: 'Bug',
      task: 'Task',
      history: 'History',
      investigation: 'History',
    },
    issuePriority: {
      priority: 'Priority',
      edit: 'Change priority',
      lowest: 'Very low',
      low: 'Low',
      medium: 'Medium',
      high: 'Medium',
      urgent: 'Medium',
    },
  },

  access: {
    access: 'Access',
    private: 'Private',
    privateDescription:
      'Only administrators and users added to the project can search, create and edit its tasks.',
    limited: 'Limited',
    limitedDescription:
      'Anyone can search, view and comment. Only users added to the project can create and edit its tasks.',
    opened: 'Open',
    openedDescription:
      'Anyone can search, view, comment, create and edit tasks.',
  },

  people: {
    membersNoCount: 'members',
    members: '0 members | {n} member | {n} member | {n} members',
    yourNewTeam: 'Your new team!',
    createTeam: 'Create a new team',
    addTeamMembers: 'Add members to a team',
    deleteTeam: 'Delete team?',
    deleteTeamText: 'Delete the command <span class="text-weight-bold"> {name} </span> with {number} members?',
    activityAccess: 'Other users will only see the objects they have access to.',
    activityYourLast:
      'This shows all objects that you have created, modified or commented on in the past 90 days.',
    activityUserLast:
      'This shows all items that the user has created, changed or commented on in the past 90 days.',
    activityTeamLast:
      'This shows all objects that the team has created, modified or commented on in the past 90 days.',
    manageAccount: 'Manage Account',

    info: 'information',
    contactInfo: 'contact details',
    yourPosition: 'Your Position',
    position: 'Position',
    yourDepartment: 'Your Department',
    department: 'Department',
    yourOrganisation: 'Your Organization',
    organisation: 'Organization',
    yourLocation: 'Your location',
    location: 'Location',
  },

  user: {
    displayName: 'Display Name',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    confirmEmail: 'Confirm Email',
    profile: 'Profile',
    displayNameUsernameOrEmail: 'Their display name, username, or email',
    max10Users: 'You can only invite 10 users at a time.',
  },

  auth: {
    register: 'Register',
    registerJiraAccount: 'Create a new Jira account',
    resetPassword: 'Reset password',
    signIn: 'Sign in',
    signOut: 'Sign out',
    signInJira: 'Sign in to your Jira account',
    scanQrCode: 'Scan the QR code using the Google Authenticator app and enter the code in the field below',
    enter2FaCode: 'Enter the code from the Google Authenticator app',
    incorrect2FaCode: 'Invalid code, please try again',
    recoverPassword: 'Recover password from Jira account',
    sendEmail: 'Send Email',
    passwordsNotMatch: 'Passwords do not match',
  },

  validation: {
    required: 'Required field',
    incorrectEmailFormat: 'Invalid Email Format',
    usernameTaken: 'Username is already taken',
    emailTaken: 'This email is already registered',
    minChars: 'Minimum 0 characters | Minimum {n} character | Minimum {n} characters | Minimum {n} characters',
    maxChars: 'Maximum 0 characters | Maximum {n} character | Maximum {n} characters | Maximum {n} characters',
    upToChars: 'Up to 0 characters | Up to {n} character | Up to {n} characters | Up to {n} characters',
  },

  tabs: {
    work: 'Your work',
    projects: 'Projects',
    filters: 'Filters',
    dashboards: 'Dashboards',
    people: 'People',
    apps: 'Applications',
  },

  notification: {
    notifications: 'Notifications',
    showUnread: 'Show only unread',

    noLast30Days: 'No notification in the last 30 days',
    noUnreadLast30Days: 'Read all notifications in the last 30 days',

    markRead: 'Mark as read',
    markAllRead: 'Mark all as read',
    markUnread: 'Mark as unread',

    typeTitles: {
      news: 'Jira App News',
      issueAssign: 'An issue has been assigned to you',
      issueWatchUpdate: 'The watched issue has been updated',
    },
  },

  date: {
    secondsAgo: '0 seconds ago | {n} second ago | {n} seconds ago | {n} seconds ago',
    minutesAgo: '0 minutes ago | {n} minute ago | {n} minutes ago | {n} minute ago',
    hoursAgo: '0 hours ago | {n} hour ago | {n} hours ago | {n} hour ago',
    daysAgo: '0 days ago| {n} day ago | {n} days ago | {n} day ago',
    monthsAgo: '0 months ago | {n} month ago | {n} months ago | {n} month ago',

    today: 'Today',
    yesterday: 'Yesterday',
    older: 'Older',
  },

  table: {
    name: 'Name',
    key: 'Key',
    type: 'Type',
    template: 'Template',
    leader: 'Template',
    group: 'Group',
    owner: 'Owner',
    resetFilters: 'Reset filters',
  },
};
