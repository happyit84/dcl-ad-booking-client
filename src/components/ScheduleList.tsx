import {FC, useEffect, useState} from 'react'
import MultiDiv from './MultiDiv'
import {Contract} from "@ethersproject/contracts";

interface ScheduleListProps {
  contract: Contract | undefined,
  account: string | null | undefined
}

interface Schedule {
  id: number,
  startTS: number,
  startDT: string,
  endTS: number,
  endDT: string,  
  booker: string,
  imgUrl: string,
}

export const ScheduleList: FC<ScheduleListProps> = ({contract, account}) => {
  const [errorMsg, setErrorMsg] = useState<string>()
  const [schedules, setSchedules] = useState<Array<Schedule>>()
  const [accountUpperCase, setAccountUpperCase] = useState<string>()
  const _contract = contract

  const updateScheduleList = async () => {
    var tsNow = Math.floor(new Date().getTime() / 1000)
    tsNow = tsNow - (tsNow % 3600)
    const tsMonthLater = tsNow + 60*60*24*7
    try {
      const r = await _contract?.getScheduleIds(tsNow, tsMonthLater)
      //console.log("ScheduleList.tsx useEffect[] > fetchData()")
      //console.log(r)
      let schedules2: Array<Schedule> = new Array<Schedule>()
      for (let i=0 ; i < r.length; i++) {
        const s = await _contract?.getScheduleDetail(r[i])
        //console.log("index: ", i)
        //console.log(s)
        const dataDecoded = decodeURIComponent(s.data)
        const dataJson = JSON.parse(dataDecoded)
        let s2: Schedule = {
          id: r[i],
          startTS: s.startTimestamp,
          startDT: new Date(s.startTimestamp * 1000).toLocaleString(), 
          endTS: s.endTimestamp,
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

  function isPresentSchedule(s:Schedule) {
    const tsNow = new Date().getTime()
    console.log("ScheduleList.tsx > isPresentSchedule() > startTS=", s.startTS*1000, ", endTS=", s.endTS*1000, ", tsNow=", tsNow)
    const r = (s.startTS*1000 <= tsNow && tsNow < s.endTS*1000)
    console.log("ScheduleList.tsx > isPresentSchedule() > r=", r)
    return r
  }

  useEffect(() => {
    //console.log("ScheduleList.tsx > useEffect[]")
    //if (account)
      setAccountUpperCase(account ? account.toUpperCase() : "")
    console.log("ScheduleList.tsx > useEffect[] > _accountUpperCase: ", accountUpperCase)
    setErrorMsg("")    
    if (contract) {
      //console.log("ScheduleList.tsx > useEffect[] 2")
      updateScheduleList()
    }
  },[])

  function cancelSchedule(s: Schedule) {
    //  TODO: change confirm windows to display the image so user can definitely confirm his cancelation
    if (false == window.confirm("Are you sure to cancel schedule: " + s.startDT + " ~ " + s.endDT)) {
      return;
    }

    try {
      _contract?.removeSchedule(s.id)
    } catch (e) {
      window.alert(""+e)
    }
  }

  return (
    <div className="w80">
      <MultiDiv>
        <div className="error">{errorMsg}</div>
        <ol>
          {schedules?.map((s) => (
            <li>
              <MultiDiv>                
                <div>
                  {s.startDT} ~ {s.endDT} [{s.booker.substring(0,6) + "..." + s.booker.substring(38, 42)}] [<a href={s.imgUrl} target="_blank">see image</a>] 
                  {accountUpperCase == s.booker.toUpperCase() && !isPresentSchedule(s) ? (<button onClick={(event:any) => cancelSchedule(s)}>cancel</button>) : <></>}
                </div>
              </MultiDiv>
            </li>))
          }
        </ol>
      </MultiDiv>
    </div>

  )
}