import Link from "next/link";

const PaginationPrevious = ({ page, pathname, query, ...props }) => (
  <Link href={{ pathname, query }}>
    <a href={pathname} className="pagination-previous" {...props}>
      Prev
    </a>
  </Link>
);

export default PaginationPrevious;
