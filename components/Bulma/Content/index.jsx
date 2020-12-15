import classNames from "classnames";

const Content = ({ children }) => {
  const classes = {};
  const className = classNames("content", classes);
  return <div className={className}>{children}</div>;
};

export default Content;
