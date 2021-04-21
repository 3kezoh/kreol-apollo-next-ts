import Link from "next/link";

const PaginationPrevious = ({ page, ...props }) => (
  <Link href="/">
    <a href="/" className="pagination-previous" {...props}>
      Prev
    </a>
  </Link>
);

export default PaginationPrevious;
