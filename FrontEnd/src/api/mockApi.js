import { uid } from "uid";
export let mockUsers = [
  {
    id: uid(),
    firstname: "Bariwala",
    lastname: "Chacha",
    username: "bariwala.chacha@gmail.com",
    email: "bariwala.chacha@gmail.com",
    passhash: "bbbbbb",
  },
  {
    id: uid(),
    firstname: "mock",
    lastname: "user",
    username: "mock.user@gmail.com",
    email: "mock.user@gmail.com",
    passhash: "aaaaaa",
  },
];

export let mockNests = [
  {
    id: uid(),
    title: "neer",
    description: "This is a very good basha. It will feel like home. NOT",
    location: {
      lat: 23.784371669488138,
      long: 90.39784565568004,
      address: "22b, baker street",
    },
    contact: {
      owner: mockUsers[0].id,
    },
    layout: {
      bed: 3,
      bath: 3,
      drawing: true,
      dinning: true,
      totalfloor: 10,
      vacantfloors: [2, 5],
      area: 1600,
    },
    amenities: {
      furnished: false,
      ac: false,
      heater: false,
      geaser: false,
    },
    utilities: {
      gas: "meter",
      electricity: "meter",
      water: "free",
    },
    pets: {
      dog: "allowed",
      cat: "allowed",
      rats: "not-allowed",
    },
    leaseTerms: {
      rent: {
        duration: "monthly",
        amount: 20000,
      },
      advance: "2 months",
      notice: "2 months",
    },
    tenantRestrictions: {
      bachelor: "not-allowed",
      family: "allowed",
      additional: "",
    },
  },
];

export let mockBookMarks = [[mockUsers[0].id, mockNests[0].id]];

// export const login = (email, pass) => {
//   // const
// };
