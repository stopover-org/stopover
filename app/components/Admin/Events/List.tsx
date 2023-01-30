import { Datagrid, EditButton, List, TextField } from "react-admin";

export const EventsList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="event_type" />
      <TextField source="recurring_type" />
      <TextField source="organizer_price_per_uom_cents" />
      <TextField source="attendee_price_per_uom_cents" />
      <EditButton />
    </Datagrid>
  </List>
);

export default EventsList;
