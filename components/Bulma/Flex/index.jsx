import classNames from "classnames";

const Flex = ({ justifyContent, children }) => {
  const classes = {};

  if (justifyContent) classes[`is-justify-content-${justifyContent}`] = true;

  const className = classNames("is-flex", classes);

  return <div className={className}>{children}</div>;
};

export default Flex;
