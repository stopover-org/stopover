export default {
  models: {
    stripeIntegration: {
      singular: "Stripe Integration",
      plural: "Stripe Integrations",
      attributes: {
        id: "ID",
        stripeableType: "Linked model",
        stripeableId: "ID of linked model",
        priceId: "Price ID in Stripe",
        productId: "Product ID in Stripe",
        version: "Version of Integration",
        status: "Status",
      },
    },
  },
};
