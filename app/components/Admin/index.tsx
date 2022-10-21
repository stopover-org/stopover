import { Admin, Resource } from "react-admin";
import dataProvider from "../../lib/adminDataProvider";
import EventsList from "./Events/List";
import EditEvent from "./Events/Edit";
import InterestsList from "./Interests/List";
import EditInterest from "./Interests/Edit";

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="events" list={EventsList} edit={EditEvent} />
    <Resource name="interests" list={InterestsList} edit={EditInterest} />
  </Admin>
);

export default AdminApp;
