import Link from "next/link";

const PaginationNext = ({ page, pathname, query, ...props }) => (
  <Link href={{ pathname, query }}>
    <a href={pathname} className="pagination-next" {...props}>
      Next
    </a>
  </Link>
);

export default PaginationNext;
