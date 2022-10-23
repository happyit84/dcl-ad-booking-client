import {FC, useState, useEffect} from 'react'
import MultiDiv from './MultiDiv'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {Contract} from "@ethersproject/contracts";
import '../App.css'
import { Button } from "../Button";
import { Schedule, UpdateScheduleListFunc } from "./types"

interface ModifyScheduleProps {  
  contract: Contract | undefined,
  oldSchedule: Schedule,
  updateScheduleList: UpdateScheduleListFunc,
}

export const ModifySchedule: FC<ModifyScheduleProps> = ({contract, oldSchedule, updateScheduleList}) => {

  const [startDT, setStartDT] = useState<Date|null>()
  const [endDT, setEndDT] = useState<Date|null>()
  const [imgUrl, setImgUrl] = useState<string>()
  const [errorMsg, setErrorMsg] = useState<string>()
  const [successMsg, setSuccessMsg] = useState<string>()

  useEffect(() => {
    setStartDT(new Date(oldSchedule.startTS * 1000))
    setEndDT(new Date(oldSchedule.endTS * 1000))
    setImgUrl(oldSchedule.imgUrl)
  }, [])

  const modifySchedule = async () => {
    //console.log("CreateSchedule.tsx > craeteSchedule(): contract: ", contract)
    var _contract:Contract
    if (contract) {
       _contract = contract
    } else {
      return
    }
    
    setErrorMsg("")
    setSuccessMsg("")
    if (!imgUrl)
    {
      setErrorMsg("image URL is empty. You have to set image URL.")
      return
    }      

    var tsStart:number = 0
    var tsEnd:number = 0
    if (startDT !== null && startDT !== undefined)
    {
      tsStart = Math.floor(startDT.getTime() / 1000)
      console.log(tsStart)
      console.log(startDT?.toLocaleDateString() + " " + startDT?.toLocaleTimeString())
    }    
    if (endDT !== null && endDT !== undefined)
    {
      tsEnd = Math.floor(endDT.getTime() / 1000)
      console.log(tsEnd)
      console.log(endDT?.toLocaleDateString() + " " + endDT?.toLocaleTimeString())  
    }

    const dataJson = {
      version: 1,
      img: imgUrl
    }
    const dataString = JSON.stringify(dataJson)
    //console.log('dataString', dataString)
    const dataEncoded = encodeURIComponent(dataString)
    //console.log('dataEncoded', dataEncoded)

    try {
      const r_feePerSecond = await _contract.getFeePerSecond()
      //console.log('r1=')
      console.log(r_feePerSecond)

      const feePerSecond = parseInt(r_feePerSecond);      
      let ethWei = ((tsEnd - tsStart)*feePerSecond) - oldSchedule.paidEth;
      if (ethWei < 0 ) ethWei = 0
      const r = await _contract.modifySchedule(oldSchedule.id, tsStart, tsEnd, dataEncoded, {value: ethWei})
      //console.log("call createSchedule()")
      console.log(r)
      //setSuccessMsg("Succeded to make reservation!")
      updateScheduleList()
    } catch (error) {
      setErrorMsg(""+error)
    }
  }

  function handleChange(event : any) {
    setImgUrl(event.target.value)
  }
  
  return (
    <div>
      <MultiDiv>
        <h1>        
          Modify Reservation
        </h1>      
        <table>
          <tbody>
            <td>From</td>
            <td>
            <DatePicker
              selected={startDT}
              onChange={(date) => setStartDT(date)}
              showTimeSelect
              timeFormat="HH:00 aa"
              timeIntervals = {60}
              timeCaption="Time"
              dateFormat="yyyy-MM-dd h:00 aa"
            />
            </td>
            <td>--&gt; To</td>
            <td></td>
            <DatePicker 
              selected={endDT}
              onChange={(date) => setEndDT(date)}
              showTimeSelect
              timeFormat="HH:00 aa"
              timeIntervals = {60}
              timeCaption="Time"
              dateFormat="yyyy-MM-dd h:00 aa"
            />
          </tbody>
        </table>
        <label>Image URL: 
          <input className="url" type="text" name="Image URL" onChange={handleChange} value={imgUrl}/>
        </label><br/>
        <br/>
        <a href={imgUrl} target="_blank"><img src={imgUrl} /></a>
        <br/>
        <div className="error">{errorMsg}</div>
        <div className="success">{successMsg}</div>
        <br/>
        <Button onClick={modifySchedule}>Modify Reservation</Button>
      </MultiDiv>
    </div>
  )
}