import Link from "next/link";

const PaginationPrevious = ({ page, ...props }) => (
  <Link href={{ pathname: "/", query: { page } }}>
    <a href="/" className="pagination-previous" {...props}>
      Prev
    </a>
  </Link>
);

export default PaginationPrevious;
