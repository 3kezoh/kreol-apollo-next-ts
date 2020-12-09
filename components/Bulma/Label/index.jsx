const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="label">
    {children}
  </label>
);

export default Label;
