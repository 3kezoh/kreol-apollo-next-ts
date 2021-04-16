const DropdownContent = ({ children, ...props }) => (
  <div className="dropdown-content" {...props}>
    {children}
  </div>
);

export default DropdownContent;
