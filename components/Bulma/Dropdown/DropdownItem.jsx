const DropdownItem = ({ children, ...props }) => (
  <li className="dropdown-item" {...props}>
    {children}
  </li>
);

export default DropdownItem;
