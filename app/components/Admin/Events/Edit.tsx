import {
  Edit,
  ImageField,
  ImageInput,
  NumberInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const EditEvent = () => (
  <Edit>
    <SimpleForm>
      <TextInput name="title" source="title" />
      <TextInput name="description" source="description" />
      <ImageInput
        source="images"
        label="Related pictures"
        accept="image/*"
        multiple
      >
        <ImageField source="src" title="title" />
      </ImageInput>
      <NumberInput
        name="organizer_price_per_uom_cents"
        source="organizer_price_per_uom_cents"
      />
      <NumberInput
        name="attendee_price_per_uom_cents"
        source="attendee_price_per_uom_cents"
      />
      <TextInput name="duration_time" source="duration_time" />
      <TextInput name="house_number" source="house_number" />
      <TextInput name="street" source="street" />
      <TextInput name="city" source="city" />
      <TextInput name="country" source="country" />
      <TextInput name="region" source="region" />
      <TextInput name="full_address" source="full_address" />
      <NumberInput name="longitude" source="longitude" />
      <NumberInput name="latitude" source="latitude" />
    </SimpleForm>
  </Edit>
);

export default EditEvent;
