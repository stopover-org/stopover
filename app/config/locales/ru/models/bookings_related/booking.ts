export default {
	models: {
		booking: {
			attributes: {
				id: 'ID',
				account: 'Аккаунт владельца',
				bookedFor: 'Дата бронирования',
				event: 'Мероприятие',
				bookingOptions: 'Опции',
				eventOptions: 'Доступные опции',
				status: 'Статус',
				paymentType: 'Выбранный способ оплаты',
				schedule: 'Место в расписании',
				attendeeTotalPrice: 'Они заплатят',
				organizerTotalPrice: 'Вы получите',
				leftToPayPrice: 'Осталось заплатить',
				leftToPayDeposit: 'Осталось внести',
				alreadyPaidPrice: 'Уже оплачено',
				possibleRefundAmount: 'Возможный возврат',
				possiblePenaltyAmount: 'Возможный штраф',
				trip: 'Путешествие',
				payments: 'Платежи',
				refunds: 'Возвраты',
				cancellationTerms: 'Условия возврата',
				attedenees: 'Участники'
			}
		}
	}
}