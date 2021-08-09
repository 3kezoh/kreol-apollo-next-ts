export const stringifyCookie = (cookie: { [i: string]: string }) => {
  let stringified: string = "";
  for (const key in cookie) {
    if (Object.prototype.hasOwnProperty.call(cookie, key)) {
      stringified += `${key}=${cookie[key]};`;
    }
  }
  return stringified;
};
