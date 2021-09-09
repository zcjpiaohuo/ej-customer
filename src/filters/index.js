import moment from 'moment';

export function fmtDate (val) {
  return moment().format('YY-MM-DD hh-mm-ss')
}
