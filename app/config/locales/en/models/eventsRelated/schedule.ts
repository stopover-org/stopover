export default {
  models: {
    schedule: {
      singular: "Date of event",
      plural: "Timetable",
      attributes: {
        id: "ID",
        scheduledFor: "Date",
        status: "Status",
        leftPlaces: "Left {{places}} places for booking",
      },
    },
  },
};
