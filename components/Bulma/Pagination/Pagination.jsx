import classNames from "classnames";

const Pagination = ({ children, ariaLabel, isCentered, ...props }) => {
  const classes = { "is-centered": isCentered };

  const className = classNames("pagination", classes);

  return (
    <nav className={className} role="navigation" aria-label={ariaLabel} {...props}>
      {children}
    </nav>
  );
};

export default Pagination;
