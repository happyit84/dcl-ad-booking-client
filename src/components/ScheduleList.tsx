import {FC, useEffect, useState} from 'react'
import MultiDiv from './MultiDiv'
import {Contract} from "@ethersproject/contracts";

interface ScheduleListProps {
  contract: Contract | undefined
}

interface Schedule {
  startDT: string,
  endDT: string,
  booker: string,
  imgUrl: string,
}

export const ScheduleList: FC<ScheduleListProps> = ({contract}) => {
  const [errorMsg, setErrorMsg] = useState<string>()
  const [schedules, setSchedules] = useState<Array<Schedule>>()

  useEffect(() => {
    //console.log("ScheduleList.tsx > useEffect[]")
    setErrorMsg("")
    
    if (contract) {
      //console.log("ScheduleList.tsx > useEffect[] 2")      
      const fetchData = async () => {
        var tsNow = Math.floor(new Date().getTime() / 1000)
        tsNow = tsNow - (tsNow % 3600)
        const tsMonthLater = tsNow + 60*60*24*7
        try {
          const r = await contract.getScheduleIds(tsNow, tsMonthLater)
          //console.log("ScheduleList.tsx useEffect[] > fetchData()")
          //console.log(r)
          let schedules2: Array<Schedule> = new Array<Schedule>()
          for (let i=0 ; i < r.length; i++) {
            const s = await contract.getScheduleDetail(r[i])
            //console.log("index: ", i)
            //console.log(s)
            const dataDecoded = decodeURIComponent(s.data)
            const dataJson = JSON.parse(dataDecoded)
            let s2: Schedule = {
              startDT: new Date(s.startTimestamp * 1000).toLocaleString(), 
              endDT: new Date(s.endTimestamp*1000).toLocaleString(), 
              booker: s.booker, 
              imgUrl: dataJson.img
            }            
            schedules2.push(s2)            
          }
          setSchedules(schedules2)
          //console.log(schedules)
        } catch (e) {
          setErrorMsg(""+e)
        }
      }

      fetchData()
    }
  },[])

  return (
    <div className="w80">
      <MultiDiv>
        <div className="error">{errorMsg}</div>
        <ol>
          {schedules?.map((s) => (
            <li>
              <MultiDiv>                
                <div>{s.startDT} ~ {s.endDT} [{s.booker}] <a href={s.imgUrl} target="_blank"> See image</a></div>                
              </MultiDiv>
            </li>))
          }
        </ol>
      </MultiDiv>
    </div>

  )
}