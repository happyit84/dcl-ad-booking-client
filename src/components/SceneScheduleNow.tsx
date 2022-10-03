import {FC, useEffect, useState} from 'react';
import MultiDiv from './MultiDiv'
import {Contract} from "@ethersproject/contracts";

interface SceneScheduleNowProps {
  contract: Contract | undefined
}

export const SceneScheduleNow: FC<SceneScheduleNowProps> = ({contract}) => {
  const [scheduleExist, setScheduleExist] = useState<boolean>(false)
  const [id, setId] = useState<number>(0)
  const [startDT, setStartDT] = useState<string>()
  const [endDT, setEndDT] = useState<string>()
  const [booker, setBooker]= useState<string>("")
  const [dataVersion, setDataVersion] = useState<number>()
  const [dataImg, setDataImg] = useState<string>()
  
  useEffect(() => {
    console.log("SceneScheduleNow.tsx > useEffect[]")
    if (contract) {      
      const fetchData = async () => {
        console.log("SceneScheduleNow.tsx > useEffect[] > getScheduleNow()")
        const r = await contract.getScheduleNow()
        console.log("SceneScheduleNow.tsx > useEffect[] > r =", r)
        const _scheduleExist = r.scheduleExist && !r.removed        
        if (_scheduleExist)
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

          setScheduleExist(_scheduleExist)
        }
      }

      fetchData()
    }
  }, [])

  return (
    <MultiDiv>
      <h1>Present Schedule</h1>
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
