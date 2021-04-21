import Link from "next/link";

const PaginationNext = ({ page, ...props }) => (
  <Link href="/">
    <a href="/" className="pagination-next" {...props}>
      Next
    </a>
  </Link>
);

export default PaginationNext;
