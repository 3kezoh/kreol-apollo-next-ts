import Link from "next/link";

const PaginationNext = ({ page, ...props }) => (
  <Link href={{ pathname: "/", query: { page } }}>
    <a href="/" className="pagination-next" {...props}>
      Next
    </a>
  </Link>
);

export default PaginationNext;
