import { useField, useFormikContext } from "formik";

const Input = (props: any) => {
  const field = useField(props.name);
  const context = useFormikContext();
  console.log(field, context);

  return null;
};

export default Input;
