import Link from "next/link";

const PaginationNext = ({ page, pathname, ...props }) => (
  <Link href={{ pathname, query: { page } }}>
    <a href={pathname} className="pagination-next" {...props}>
      Next
    </a>
  </Link>
);

export default PaginationNext;
