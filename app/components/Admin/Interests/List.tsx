import { Datagrid, EditButton, List, TextField } from "react-admin";

export const InterestsList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="active" />
      <EditButton />
    </Datagrid>
  </List>
);

export default InterestsList;
