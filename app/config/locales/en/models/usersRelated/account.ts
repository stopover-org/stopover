export default {
  models: {
    account: {
      singular: "Account",
      plural: "Accounts",
      attributes: {
        id: "ID",
        status: "Status",
        name: "Name",
        street: "Street",
        region: "Region",
        country: "Country",
        fullAddress: "Full Address",
        longitude: "Longitude",
        latitude: "Latitude",
        phones: "Phones",
        primaryPhone: "Primary Phone",
        primaryEmail: "Primary Email",
        verifiedAt: "Verified at",
        interests: "Primary Categories",
      },
    },
  },
};
