import classNames from "classnames";

const Button = ({ color, buttonStyle, children, ...props }) => {
  const classes = {};

  if (color) classes[`is-${color}`] = true;
  if (buttonStyle) classes[`is-${buttonStyle}`] = true;

  const className = classNames("button", classes);

  return (
    <button className={className} type="submit" {...props}>
      {children}
    </button>
  );
};

export default Button;
