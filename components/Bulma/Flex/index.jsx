import classNames from "classnames";

const Flex = ({ children }) => {
  const classes = {};
  const className = classNames("is-flex", classes);
  return <div className={className}>{children}</div>;
};

export default Flex;
