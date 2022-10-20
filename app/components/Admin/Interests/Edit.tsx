import {
  Edit,
  ImageField,
  ImageInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const EditInterest = () => (
  <Edit>
    <SimpleForm>
      <TextInput name="title" source="title" />
      <TextInput name="slug" source="slug" />
      <ImageInput
        source="images"
        label="Related pictures"
        accept="image/*"
        multiple
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
export default EditInterest;
