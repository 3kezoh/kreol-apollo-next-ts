const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={className || "label"}>
    {children}
  </label>
);

export default Label;
