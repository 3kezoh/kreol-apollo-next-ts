const handleGraphQLError = ({ graphQLErrors, setErrors }) => {
  const errors = {};
  graphQLErrors.forEach(({ extensions }) => {
    if (extensions.validationErrors) {
      extensions.validationErrors.forEach(({ field, message }) => {
        errors[field] = message;
      });
      return setErrors(errors);
    }
  });
};

export default handleGraphQLError;
