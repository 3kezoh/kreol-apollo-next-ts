import { createElement as e } from "react";
import classNames from "classnames";

const Dropdown = ({ el, isHoverable, isActive, children, ...props }) => {
  const classes = {
    "is-hoverable": isHoverable,
    "is-active": isActive,
  };

  const className = classNames("dropdown", classes);

  return e(el, { className, ...props }, children);
};

export default Dropdown;
