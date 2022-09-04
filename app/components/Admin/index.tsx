import Admin from "react-admin/src/Admin";
import { Resource } from "ra-core/src/core/Resource";
// import {getAdminBaseUrl} from "../../lib/fetchGraphQL";
import jsonServerProvider from "ra-data-json-server";

// const dataProvider = jsonServerProvider(getAdminBaseUrl());
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={() => null} />
    <Resource name="comments" list={() => null} />
  </Admin>
);

export default AdminApp;
