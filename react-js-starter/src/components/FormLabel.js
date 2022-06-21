const FormLabel = ({ children, ...rest }) => {
  return (
    <label {...rest} className="font-light inline-block text-sm mb-1">
      {children}
    </label>
  );
};

export default FormLabel;
