import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { getAdminBaseUrl } from "../../lib/fetchGraphQL";
import { EventsList } from "./Events/List";

const dataProvider = jsonServerProvider(
  getAdminBaseUrl().replace("graphql", "admin")
);

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="events" list={EventsList} />
  </Admin>
);

export default AdminApp;
