export interface IPlan {
  _id?: string,
  contribution: number,
  endDate: string,
  isActive: boolean,
  name: string,
  startDate: string,
  packageId?: string
  payrollFrequency: string,
  type?: string,
}
