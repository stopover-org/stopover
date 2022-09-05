import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { getAdminBaseUrl } from "../../lib/fetchGraphQL";
import EventsList from "./Events/List";
import EditEvent from "./Events/Edit";

const dataProvider = jsonServerProvider(
  getAdminBaseUrl().replace("graphql", "admin")
);

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="events" list={EventsList} edit={EditEvent} />
  </Admin>
);

export default AdminApp;
