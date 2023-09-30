export default {
  models: {
    trip: {
      attributes: {
        bookings: 'Bookings',
        startDate: 'Start date',
        endDate: 'End date',
        cities: 'Cities',
        status: 'Status',
        images: 'Images',
        canCancel: 'Can be canceled?',
        account: 'Account',
        attendeesCount: 'Estimated attendees count'
      }
    }
  }
}