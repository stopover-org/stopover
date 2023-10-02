export default {
  forms: {
    rescheduleEvent: {
      action: "Reschedule",
      modal: {
        header: "Timetable changes confirmation",
        explanation:
          "Timetampe for event {{title}} that is scheduled for {{days}} will be enqueued for planning",
        pastDatesExplanation: "All past events will not be changed or removed",
        bookingsExplanation:
          "All existing booking will be safe. Their schedules will not be available for selecting. If you want to cancel bookings too you need to do it manually",
      },
    },
  },
};
