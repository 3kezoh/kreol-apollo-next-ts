import {
  Pagination,
  PaginationEllipsis,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
} from "@Bulma/Pagination";

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

const Pager = ({ page, pages, pathname, query }) => {
  const _pages = paginate(page, pages);
  const prevPage = page - 1;
  const nextPage = page + 1;

  return (
    <Pagination isCentered>
      {page !== 1 && (
        <PaginationPrevious
          page={prevPage}
          pathname={pathname}
          query={{ ...query, page: prevPage }}
          title={`Go to page ${prevPage}`}
        />
      )}
      {page !== pages && (
        <PaginationNext
          page={nextPage}
          pathname={pathname}
          query={{ ...query, page: nextPage }}
          title={`Go to page ${nextPage}`}
        />
      )}
      <PaginationList>
        {_pages.map((_page) =>
          _page > 0 ? (
            <PaginationLink
              key={_page}
              aria-label={`Goto page ${_page}`}
              isCurrent={page === _page}
              page={_page}
              pathname={pathname}
              query={{ ...query, page: _page }}
              title={`Go to page ${_page}`}
            />
          ) : (
            <PaginationEllipsis key={_page} />
          )
        )}
      </PaginationList>
    </Pagination>
  );
};

export default Pager;
