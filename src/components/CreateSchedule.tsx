import {FC, useState, useEffect} from 'react'
import MultiDiv from './MultiDiv'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {getSceneSchedulerAddress, SceneSchedulerABI as abi} from '../abi/SceneSchedulerABI'
import { Web3Provider } from '@ethersproject/providers';
import {Contract} from "@ethersproject/contracts";
import '../App.css'
import { Button } from "../Button";

interface BookScheduleProps {
  library: any,
  chainId: number | undefined,
}

export const CreateSchedule: FC<BookScheduleProps> = ({library, chainId}) => {  
  const _chainId: number = chainId == undefined ? 0 : chainId

  const [startDT, setStartDT] = useState<Date|null>(new Date())
  const [endDT, setEndDT] = useState<Date|null>(new Date())
  const [imgUrl, setImgUrl] = useState<string>()
  const [errorMsg, setErrorMsg] = useState<string>()

  const createSchedule = async () => {
    if (!imgUrl)
    {
      setErrorMsg("image URL is empty. You have to set image URL.")
      return
    }      

    const contractAddress = getSceneSchedulerAddress(_chainId)
    if (contractAddress == '')
      return;

    const contract = new Contract(contractAddress,  abi, library.getSigner())

    var tsStart:number = 0
    var tsEnd:number = 0
    if (startDT !== null)
    {
      tsStart = Math.floor(startDT.getTime() / 1000)
      console.log(tsStart)
      console.log(startDT?.toLocaleDateString() + " " + startDT?.toLocaleTimeString())
    }    
    if (endDT !== null)
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
    console.log('dataString', dataString)
    const dataEncoded = encodeURIComponent(dataString)
    console.log('dataEncoded', dataEncoded)

    try {
      const r = await contract.createSchedule(tsStart, tsEnd, dataEncoded)
      console.log("call createSchedule()")
      console.log(r)
    } catch (error) {
      setErrorMsg(""+error)
    }    
  }

  function handleChange(event : any) {
    setImgUrl(event.target.value)
  }
  
  return (
    <MultiDiv>
      <h1>        
        Make Reservation
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
      <br/>
      <Button onClick={createSchedule}>Make Reservation</Button>
    </MultiDiv>
  )
}