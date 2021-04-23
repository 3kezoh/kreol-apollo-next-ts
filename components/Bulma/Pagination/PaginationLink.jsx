import Link from "next/link";
import classNames from "classnames";

const PaginationLink = ({ children, page, isCurrent, pathname, ...props }) => {
  const classes = { "is-current": isCurrent };

  const className = classNames("pagination-link", classes);

  return (
    <li>
      <Link href={{ pathname, query: { page } }}>
        <a href={pathname} className={className} {...props}>
          {children || page}
        </a>
      </Link>
    </li>
  );
};

export default PaginationLink;
