import classNames from "classnames";

const Container = ({ isMaxDesktop, children }) => {
  const classes = { "is-max-desktop": isMaxDesktop };
  const className = classNames("container", classes);
  return <div className={className}>{children}</div>;
};

export default Container;
