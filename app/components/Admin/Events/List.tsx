import { List, Datagrid, TextField } from "react-admin";

export const EventsList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="event_type" />
      <TextField source="recurring_type" />
      <TextField source="organizer_cost_per_uom_cents" />
      <TextField source="attendee_cost_per_uom_cents" />
    </Datagrid>
  </List>
);

export default EventsList;
