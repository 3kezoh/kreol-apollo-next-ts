import Link from "next/link";
import classNames from "classnames";

const PaginationLink = ({ children, page, isCurrent, ariaLabel, ariaCurrent, ...props }) => {
  const classes = { "is-current": isCurrent };

  const className = classNames("pagination-link", classes);

  return (
    <li>
      <Link href={{ pathname: "/", query: { page } }}>
        <a
          href="/"
          className={className}
          aria-label={ariaLabel}
          aria-current={ariaCurrent}
          {...props}
        >
          {page}
        </a>
      </Link>
    </li>
  );
};

export default PaginationLink;
