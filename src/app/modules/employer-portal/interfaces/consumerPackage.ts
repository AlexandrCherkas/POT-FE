export interface IConsumerPackage {
  name: string,
  isActive: boolean,
  startDate: string,
  endDate: string,
  payrollFrequency: string,
  contribution: number,
  election: number,
  _id: string,
  availableAmount: number
}
