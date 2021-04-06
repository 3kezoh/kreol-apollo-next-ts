const Select = ({ children, ...props }) => (
  <div className="select">
    <select {...props}>{children}</select>
  </div>
);

export default Select;
