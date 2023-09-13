export interface IClaim {
  claimNumber: string,
  amount: number,
  consumer: {
    balance: number,
    email: string,
    employer: string,
    firstName: string,
    lastName: string,
    loginName: string,
    password: string,
    id: string,
  },
  isApproved: boolean,
  receipt?: string,
  name?: string,
  package:{
    availableAmount: number,
    contribution: number,
    election: number,
    endDate: string,
    isActive: boolean,
    name: string,
    startDate: string,
    payrollFrequency: string,
    type: string,
    _id: string,
  },
  serviceDate: string
}