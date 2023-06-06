import React from "react";
import Table from "../../../components/v2/Table";

// <tr>
//   <th>date</th>
//   <th>event</th>
//   <th>300$</th>
// </tr>

const BookingsSection = () => (
  <Table data={[]} headers={[]} aria-label="basic table" />
);
export default React.memo(BookingsSection);
