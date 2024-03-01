export default {
  models: {
    notification: {
      singular: "Notification",
      plural: "Notifications",
      attributes: {
        id: "ID",
        content: "Message",
        subject: "Subject",
        to: "To",
        from: "From",
        sentAt: "Sent At",
        deliveryMethod: "Delivery Method",
      },
    },
  },
};
