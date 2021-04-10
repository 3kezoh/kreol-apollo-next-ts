import classNames from "classnames";

const Flex = ({ justifyContent, direction, alignItems, children }) => {
  const classes = {};

  if (justifyContent) classes[`is-justify-content-${justifyContent}`] = true;
  if (direction) classes[`is-flex-direction-${direction}`] = true;
  if (alignItems) classes[`is-align-items-${alignItems}`] = true;

  const className = classNames("is-flex", classes);

  return <div className={className}>{children}</div>;
};

export default Flex;
