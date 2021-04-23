import Link from "next/link";

const PaginationPrevious = ({ page, pathname, ...props }) => (
  <Link href={{ pathname, query: { page } }}>
    <a href={pathname} className="pagination-previous" {...props}>
      Prev
    </a>
  </Link>
);

export default PaginationPrevious;
