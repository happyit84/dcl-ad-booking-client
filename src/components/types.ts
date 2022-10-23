export interface Schedule {
  id: number,
  index: number,
  startTS: number,
  startDT: string,
  endTS: number,
  endDT: string,  
  booker: string,
  imgUrl: string,
  paidEth: number,
  onModify: boolean,
  errorMsg: string,
}

export type UpdateScheduleListFunc = () => void