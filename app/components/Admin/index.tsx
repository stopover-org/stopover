import { Admin, Resource } from "react-admin";
import dataProvider from "../../lib/adminDataProvider";
import EventsList from "./Events/List";
import EditEvent from "./Events/Edit";

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="events" list={EventsList} edit={EditEvent} />
  </Admin>
);

export default AdminApp;
