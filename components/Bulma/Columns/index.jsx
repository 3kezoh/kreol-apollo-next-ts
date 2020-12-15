import classNames from "classnames";

const Columns = ({ m, p, children }) => {
  const classes = {};

  classes[`m-${m || "0"}`] = true;

  classes[`p-${p || "0"}`] = true;

  const className = classNames("columns", classes);

  return <div className={className}>{children}</div>;
};

export default Columns;
