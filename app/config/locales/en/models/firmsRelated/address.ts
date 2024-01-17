export default {
  models: {
    address: {
      singular: "Address",
      plural: "Addresses",
      attributes: {
        fullAddress: "Address",
        country: "Country",
        region: "Region",
        city: "City",
        street: "Street",
        houseNumber: "House number",
        postalCode: "Postal code",
        latitude: "Latitude",
        longitude: "Longitude",
      },
    },
  },
};
