export default {
  models: {
    firm: {
      singular: "Firm",
      plural: "Firms",
      attributes: {
        id: "ID",
        city: "City",
        contactPerson: "Contact Person",
        contacts: "Contacts",
        country: "Country",
        description: "Description",
        fullAddress: "Full Address",
        houseNumber: "House Number",
        latitude: "Latitude",
        longitude: "Longitude",
        region: "Region",
        status: "Status",
        street: "Street",
        title: "Title",
        website: "Website",
        image: "Logo",
        paymentType: "Available Payment types",
        availablePaymentMethods: "Available for choosing Payment types",
        margin: "Margin",
        primaryPhone: "Phone for notifications",
        primaryEmail: "Email for notifications",
        contractAddress: "Contract address for crypto payments",
        firmType: "Type of firm",
      },
      enums: {
        paymentTypes: {
          stripe: "Online",
          cash: "Cash",
          crypto: "Crypto",
        },
        businessTypes: {
          individual: "Individual Enterpreneur",
          company: "Legal Entity",
        },
        firmTypes: {
          onboarding: "Onboarding",
          live: "Live",
        },
      },
      statusExplanations: {
        pending: [
          "The company is awaiting verification. Please ensure that the contact email is correct. We will contact you shortly to clarify the details.",
          "You can create events including dates, images, and other relevant information, but it will not be published until the company's verification is complete.",
          "If you have any questions, please email {{email}} or chat on the website.",
        ],
        active: [
          "The company has been verified. You can create any events.",
          "If you have any questions, please email {{email}} or chat on the website.",
        ],
        removed: [
          "The company has been removed. All events have been unpublished, all incomplete bookings have been canceled, and money has been refunded to participants according to the refund policies.",
          "If you have any questions, please email {{email}} or chat on the website.",
        ],
      },
    },
  },
};
