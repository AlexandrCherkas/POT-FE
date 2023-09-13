export interface IEmployer {
  _id: string,
  companyName: string,
  loginName: string,
  password: string,
  countryCode: string,
  address: {
      street: string,
      city: string,
      state: string,
      zipCode: string,
      phone: number
  },
  permissions: {
      canFillClaims: boolean,
      canAddConsumers: boolean
  },
  packages: [],
  consumers: []
}
