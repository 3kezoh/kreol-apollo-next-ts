import classNames from "classnames";

const Column = ({ m, p, isOneFifth, isTwoThirds, isFourFifths, isHiddenMobile, children }) => {
  const classes = {
    "is-hidden-mobile": isHiddenMobile,
  };

  if (m >= 0) classes[`m-${m}`] = true;

  if (p >= 0) classes[`p-${p}`] = true;

  if (isOneFifth)
    classes[`is-one-fifth${typeof isOneFifth === "string" ? `-${isOneFifth}` : ""}`] = true;

  if (isTwoThirds)
    classes[`is-two-thirds${typeof isTwoThirds === "string" ? `-${isTwoThirds}` : ""}`] = true;

  if (isFourFifths)
    classes[`is-four-fifths${typeof isFourFifths === "string" ? `-${isFourFifths}` : ""}`] = true;

  const className = classNames("column", classes);

  return <div className={className}>{children}</div>;
};

export default Column;
