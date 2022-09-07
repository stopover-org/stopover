import { Edit, SimpleForm, TextInput, NumberInput } from "react-admin";

export const EditEvent = () => (
  <Edit>
    <SimpleForm>
      <TextInput name="title" source="title" />
      <TextInput name="description" source="description" />
      <NumberInput
        name="organizer_cost_per_uom_cents"
        source="organizer_cost_per_uom_cents"
      />
      <NumberInput
        name="attendee_cost_per_uom_cents"
        source="attendee_cost_per_uom_cents"
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
