import classNames from "classnames";

const Section = ({ children }) => {
  const classes = {};
  const className = classNames("section", classes);
  return <div className={className}>{children}</div>;
};

export default Section;
