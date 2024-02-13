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
      },
      enums: {
        paymentTypes: {
          stripe: "Online",
          cash: "Cash",
          crypto: "Crypto",
        },
      },
    },
  },
};
