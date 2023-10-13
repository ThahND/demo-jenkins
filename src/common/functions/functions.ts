import { join } from 'path';

export function _isUUID(data: string | string[] | any | any[]): boolean {
  const regexUUID =
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (Array.isArray(data)) {
    for (const item of data) {
      if (!regexUUID.test(item?.toString())) return false;
    }
  } else {
    if (!regexUUID.test(data?.toString())) return false;
  }
  return true;
}

export function _getLinkPathStorage() {
  const filepath = join(__dirname);
  const listPath = filepath.split('\\');
  const linkPath = `${listPath[0]}${process.env.STORAGE}`;
  return linkPath;
}

export function _convertTextToSlug(data: string | string[] | any | any[]) {
  if (Array.isArray(data)) {
    const dataReturn = [];
    for (const item of data) {
      const temp = item
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
      dataReturn.push(temp);
    }
    return dataReturn;
  } else {
    return data
      .toString() // Cast to string
      .toLowerCase() // Convert the string to lowercase letters
      .normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
      .trim() // Remove whitespace from both sides of a string
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-');
  }
}

export function _getWeek(target: any | Date) {
  const dayNr = (target.getDay() + 6) % 7;
  const firstThursday = target.valueOf();
  target.setDate(target.getDate() - dayNr + 3);
  target.setMonth(0, 1);
  if (target.getDay() != 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
}
