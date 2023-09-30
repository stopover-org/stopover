export default {
  models: {
    stripeIntegration: {
      attributes: {
        id: 'ID',
        stripeableType: 'Связанная модель',
        stripeableId: 'ID связанной модели',
        priceId: 'ID цены в Stripe',
        productId: 'ID продукта в Stripe',
        version: 'Версия интеграции',
        status: 'Статус'
      }
    }
  }
}