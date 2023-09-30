export default {
	models: {
		booking: {
			attributes: {
				id: 'ID',
				account: 'Accounr',
				bookedFor: 'Booking date',
				event: 'Event',
				bookingOptions: 'Options',
				eventOptions: 'Possible options',
				status: 'Status',
				paymentType: 'Payment type',
				schedule: 'Schedule',
				attendeeTotalPrice: 'They pay',
				organizerTotalPrice: 'You get',
				leftToPayPrice: 'Left to pay',
				leftToPayDeposit: 'Left to pay deposit',
				alreadyPaidPrice: 'Already paid',
				possibleRefundAmount: 'Possible refund',
				possiblePenaltyAmount: 'Possible penalty',
				trip: 'Trip',
				payments: 'Payments',
				refunds: 'Refunds',
				cancellationTerms: 'Booking cancellation terms',
				attendees: 'Attendees'
			}
		}
	}
}