const Input = ({ type, ...props }) => (
  <input className={type === "radio" ? null : "input"} type={type} {...props} />
);

export default Input;
