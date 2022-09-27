import {FC, useEffect, useState} from 'react';
import { getSceneSchedulerAddress } from '../abi/SceneSchedulerABI';
import MultiDiv from './MultiDiv'
import {SceneSchedulerABI as abi} from '../abi/SceneSchedulerABI'
import { Web3Provider } from '@ethersproject/providers';
import {Contract} from "@ethersproject/contracts";
import { formatEther } from '@ethersproject/units';

const fetcher = (library: Web3Provider | undefined, abi:any) => (...args:any) => {
  if (!library) return

  const [arg1, arg2, ...params] = args
  const address = arg1
  const method = arg2
  const contract = new Contract(address, abi, library)
  return contract[method](...params)
}


interface SceneScheduleNowProps {
  library: any,
  chainId: number | undefined,
}

export const SceneScheduleNow: FC<SceneScheduleNowProps> = ({library, chainId}) => 
{
  const _chainId: number = chainId == undefined ? 0 : chainId
  
  const [scheduleExist, setScheduleExist] = useState<boolean>(false)
  const [id, setId] = useState<number>(0)
  //const [startTimestamp, setStartTimestamp] = useState<number>(0)
  const [startDT, setStartDT] = useState<string>()
  const [endDT, setEndDT] = useState<string>()
  //const [endTimestamp, setEndtimestamp] = useState<number>(0)
  const [booker, setBooker]= useState<string>("")
  //const [dataVersion, setDataVersion] = useState<number>(0)
  //const [img, setImg] = useState<string>("")
  const [dataVersion, setDataVersion] = useState<number>()
  const [dataImg, setDataImg] = useState<string>()
  
  useEffect(() => {
    const contractAddress = getSceneSchedulerAddress(_chainId)
    if (contractAddress != "") {
      const contract = new Contract(contractAddress, abi, library.getSigner())
      
      const fetchData = async () => {
        //const result = await contract.getScheduleDetail(6)
        const r = await contract.getScheduleNow()
        //console.log(result)
        console.log(r)
        setScheduleExist(r.scheduleExist && !r.removed)
        if (scheduleExist)
        {
          var language;
          if (window.navigator.languages) {
            language = window.navigator.languages[0];
          } else {
            language = window.navigator.language || window.navigator.language;
          }

          setId(parseInt(r.id))
          const startTS = parseInt(r.startTimestamp)
          const startDate = new Date(startTS*1000)
          setStartDT(
            startDate.toLocaleDateString(language) + ' ' +
            startDate.toLocaleTimeString(language)
          )
          const endTS = parseInt(r.endTimestamp)
          const endDate = new Date(endTS*1000)
          setEndDT(
            endDate.toLocaleDateString(language) + ' ' +
            endDate.toLocaleTimeString(language)
          )
          setBooker(r.booker)
          const dataString = decodeURIComponent(r.data)
          const dataJson = JSON.parse(dataString)          
          setDataVersion(dataJson.version)
          setDataImg(dataJson.img)
        }
        
        //setStartTimeStamp(parseInt(result.startTimestamp))
      }

      console.log("call getScheduleNow()")
      fetchData()
    }
  })

  return (
    <MultiDiv>   
      <div>--------- Present Schedule ---------</div>
      {scheduleExist ?
        <MultiDiv>
          <div>id: {id}</div>
          <div>Start: {startDT}</div>
          <div>End: {endDT}</div>
          <div>booker: {booker}</div>
          <div>data version: {dataVersion}</div>
          {dataVersion == 1 && 
            <MultiDiv>              
              <a href={dataImg}>{dataImg}</a>
              <br/><br></br>
              <img src={dataImg} />
            </MultiDiv>}
        </MultiDiv>
        :
        <div>No Schedule Now</div>
      }
    </MultiDiv>
  )
}
