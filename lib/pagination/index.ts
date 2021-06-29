const getRange = (start: number, end: number) =>
  Array(end - start + 1)
    .fill(undefined)
    .map((_, i) => i + start);

export const paginate = (current: number, length: number, delta = 4) => {
  let start = Math.round(current - delta / 2);
  let end = Math.round(current + delta / 2);

  if (start - 1 === 1 || end + 1 === length) {
    start += 1;
    end += 1;
  }

  let pages =
    current > delta
      ? getRange(Math.min(start, length - delta), Math.min(end, length))
      : getRange(1, Math.min(length, delta + 1));

  const withEllipsis = (value: number, pair: number[]) =>
    pages.length + 1 !== length ? pair : [value];

  if (pages[0] !== 1) {
    pages = withEllipsis(1, [1, -1]).concat(pages);
  }

  if (pages[pages.length - 1] < length) {
    pages = pages.concat(withEllipsis(length, [-2, length]));
  }

  return pages;
};
