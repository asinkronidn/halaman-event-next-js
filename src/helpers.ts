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

export function serializeErrorMessage (text: string): string | null | undefined {
  if (typeof text !== 'undefined') {
    const textJson = JSON.parse(text);
    if (typeof textJson.errors !== 'undefined') {
      let validationMessages = textJson.errors
      if (typeof validationMessages === 'string') {
        return validationMessages
      } else if (Object.keys(validationMessages).length) {
        let errorMessages = '<ul>'
        for (let i = 0; i < Object.keys(validationMessages).length; i++) {
          errorMessages = errorMessages + '<li>' + validationMessages[Object.keys(validationMessages)[i]] + '</li>'
        }
        errorMessages = errorMessages + '</ul>'
        return errorMessages
      } else {
        return textJson
      }
    } else if (typeof textJson.message !== 'undefined') {
      return textJson.message === 'The user credentials were incorrect.' || textJson.message === 'Client authentication failed' ? 'Kombinasi email/username & password salah' : textJson.message
    } else if (typeof textJson !== 'undefined') {
      return textJson
    }
  } else if (typeof text === 'string') {
    return text
  } else {
    return 'ada yang salah, silahkan coba kembali.'
  }
}