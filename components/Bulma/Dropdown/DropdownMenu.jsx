const DropdownMenu = ({ children, ...props }) => (
  <ul className="dropdown-menu" role="menu" {...props}>
    {children}
  </ul>
);

export default DropdownMenu;
