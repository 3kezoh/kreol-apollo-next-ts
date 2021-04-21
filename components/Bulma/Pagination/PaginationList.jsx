const PaginationList = ({ children, ...props }) => (
  <ul className="pagination-list" {...props}>
    {children}
  </ul>
);

export default PaginationList;
