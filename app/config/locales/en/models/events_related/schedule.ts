export default {
  models: {
    schedule: {
      attributes: {
        id: 'ID',
        scheduledFor: 'Date',
        status: 'Status',
        event: 'Event',
        bookings: 'Bookings',
      }
    }
  }
}