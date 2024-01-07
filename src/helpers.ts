export function formatDate (date: Date, type: string): string {
  // console.log(date)
  // console.log(date.toString())
  if (type === 'full') {
    return date.toString();
  }
  date = new Date(date);
  let formatter = null;
  if (type === 'hour') {
    formatter = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' });
  } else if (type === 'day') {
    formatter = new Intl.DateTimeFormat('id-ID', { day: '2-digit' });
  } else {
    formatter = new Intl.DateTimeFormat('id-ID', { month: 'short' });
  }
  return formatter.format(date);
}