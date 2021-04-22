import {
  Pagination as BulmaPagination,
  PaginationEllipsis,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
} from "../Bulma/Pagination";

function getRange(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((v, i) => i + start);
}

function paginate(current, length, delta = 4) {
  const range = {
    start: Math.round(current - delta / 2),
    end: Math.round(current + delta / 2),
  };

  if (range.start - 1 === 1 || range.end + 1 === length) {
    range.start += 1;
    range.end += 1;
  }

  let pages =
    current > delta
      ? getRange(Math.min(range.start, length - delta), Math.min(range.end, length))
      : getRange(1, Math.min(length, delta + 1));

  const withEllipsis = (value, pair) => (pages.length + 1 !== length ? pair : [value]);

  if (pages[0] !== 1) {
    pages = withEllipsis(1, [1, -1]).concat(pages);
  }

  if (pages[pages.length - 1] < length) {
    pages = pages.concat(withEllipsis(length, [-2, length]));
  }

  return pages;
}

const Pagination = ({ page: currentPage, count }) => {
  const lastPage = Math.floor(count / 5);
  const pages = paginate(currentPage, lastPage);

  return (
    <BulmaPagination isCentered>
      {currentPage !== 1 && <PaginationPrevious page={currentPage - 1} />}
      {currentPage !== lastPage && <PaginationNext page={currentPage + 1} />}
      <PaginationList>
        {pages.map((page) =>
          page > 0 ? (
            <PaginationLink
              key={page}
              ariaLabel={`Goto page ${page}`}
              page={page}
              isCurrent={page === currentPage}
            />
          ) : (
            <PaginationEllipsis key={page} />
          )
        )}
      </PaginationList>
    </BulmaPagination>
  );
};

export default Pagination;
