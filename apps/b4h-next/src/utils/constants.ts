export const SESSION = 'session';
export const SESSION_USER_ID = 'session-user-id';
export const SESSION_GROUP_ID = 'session-group-id';
export const SESSION_GROUP_IDS = 'session-group-ids';
export const SESSIONS = [SESSION, SESSION_USER_ID, SESSION_GROUP_ID, SESSION_GROUP_IDS];

export const DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm";
export const DATE_TIME_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
export const DATE_FORMAT = 'yyyy-MM-dd';
export const MONTH_FORMAT = 'yyyy-MM';

export const FORM_MIN_LENGTH = 3;
export const FORM_MAX_LENGTH = 100;
export const FORM_MAX_LONG_LENGTH = 1000;

export const ACTION_DONE = 'DONE';
export const ACTION_FAIL = 'FAIL';
export const ACTION_INVALID = 'INVALID';
export const ACTION_SUBMIT = 'SUBMIT';
export const ACTION_SUBMIT_ALL = 'SUBMIT_ALL';
export const ACTION_DELETE = 'DELETE';
export const ACTION_DELETE_ALL = 'DELETE_ALL';
export const ACTION_FAVORITE = 'FAVORITE';

export const FETCH_GROUPS = 'groups';
export const FETCH_EXPENSES = (date: Date | undefined | null) =>
  `expenses-${date?.getFullYear() ?? 0}-${date?.getMonth() ?? 0}`;
export const FETCH_LABELS = 'labels';
export const FETCH_REVALIDATE_TIME = 900; // 15 minutes

export const ANIMATION_DELAY = 0.05;

export const SHOW_DETAILS = 'showDetails';
