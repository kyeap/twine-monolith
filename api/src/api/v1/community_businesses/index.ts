import get from './get';
import feedback from './feedback';
import questions from './questions';
import visitActivites from './visit_activities';
import visitors from './visitors';
import visitLogs from './visit_logs';

export default [
  ...get,
  ...feedback,
  ...questions,
  ...visitActivites,
  ...visitors,
  ...visitLogs,
];
