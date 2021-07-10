import { Pagination as _Pagination } from "@Bulma";
import { paginate } from "@lib/pagination";

type Props = {
  page: number;
  pages: number;
  pathname: string;
  query: any;
  prefetch?: any;
};

export const Pagination = ({ page = 1, pages, pathname, query, prefetch }: Props) => {
  const _pages = paginate(page, pages);
  const prevPage = page - 1 || 1;
  const nextPage = page + 1 > pages ? pages : page + 1;

  return pages > 1 ? (
    <_Pagination>
      {page !== 1 && (
        <_Pagination.Previous
          page={prevPage}
          pathname={pathname}
          query={{ ...query, page: prevPage }}
          title={`Go to page ${prevPage}`}
          onMouseOver={() => {
            if (prefetch && page !== prevPage) prefetch({ page: prevPage });
          }}
        />
      )}
      {page !== pages && (
        <_Pagination.Next
          page={nextPage}
          pathname={pathname}
          query={{ ...query, page: nextPage }}
          title={`Go to page ${nextPage}`}
          onMouseOver={() => {
            if (prefetch && page !== nextPage) prefetch({ page: nextPage });
          }}
        />
      )}
      <_Pagination.List>
        {_pages.map((_page) =>
          _page > 0 ? (
            <_Pagination.Link
              key={_page}
              aria-label={`Goto page ${_page}`}
              isCurrent={page === _page}
              page={_page}
              pathname={pathname}
              query={{ ...query, page: _page }}
              title={`Go to page ${_page}`}
              onMouseOver={() => {
                if (prefetch && page !== _page) prefetch({ page: _page });
              }}
            />
          ) : (
            <_Pagination.Ellipsis key={_page} />
          )
        )}
      </_Pagination.List>
    </_Pagination>
  ) : null;
};
