import classNames from "classnames";

const Columns = ({ children }) => {
  const classes = {};
  const className = classNames("columns", classes);
  return <div className={className}>{children}</div>;
};

export default Columns;
