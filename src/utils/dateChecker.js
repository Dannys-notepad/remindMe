const isValid = (date) => {
  if (typeof date !== 'string') {
    // throw new Error('The parameter value can\'t be any other data type except a string');
    return false;
  }

  const sample = date.split('-');
  if (sample.length !== 3) {
    return false;
  }

  const day = parseInt(sample[0], 10);
  const month = parseInt(sample[1], 10);
  const year = parseInt(sample[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }

  if (day < 1 || day > 31) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  return true;
};

const isPast = (date) => {
  if (!isValid(date)) {
    return false;
  }

  const presentDate = new Date();
  const sample = date.split('-');
  const day = parseInt(sample[0], 10);
  const month = parseInt(sample[1], 10) - 1; // Month is zero-based
  const year = parseInt(sample[2], 10);

  const specifiedDate = new Date(year, month, day);

  return specifiedDate < presentDate;
};

const isDDay = (date) => {
  if (!isValid(date)) {
    return false;
  }

  const presentDate = new Date();
  const sample = date.split('-');
  const day = parseInt(sample[0], 10);
  const month = parseInt(sample[1], 10) - 1; // Month is zero-based
  const year = parseInt(sample[2], 10);

  const specifiedDate = new Date(year, month, day);

  return specifiedDate.toDateString() === presentDate.toDateString();
};


module.exports = {
  isValid,
  isPast,
  isDDay
}