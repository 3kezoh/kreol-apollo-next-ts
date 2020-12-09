const Button = ({ children, ...props }) => (
  <button className="button" type="submit" {...props}>
    {children}
  </button>
);

export default Button;
