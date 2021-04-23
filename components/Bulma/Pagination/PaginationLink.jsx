import Link from "next/link";
import classNames from "classnames";

const PaginationLink = ({ children, page, isCurrent, pathname, query, ...props }) => {
  const classes = { "is-current": isCurrent };

  const className = classNames("pagination-link", classes);

  return (
    <li>
      <Link href={{ pathname, query }}>
        <a href={pathname} className={className} {...props}>
          {children || page}
        </a>
      </Link>
    </li>
  );
};

export default PaginationLink;
