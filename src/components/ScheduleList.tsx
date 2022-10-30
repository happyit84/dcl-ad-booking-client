import {FC, useEffect, useState} from 'react'
import MultiDiv from './MultiDiv'
import {Contract} from "@ethersproject/contracts";
import { Schedule, UpdateScheduleListFunc } from './types'
import { ModifySchedule } from './ModifySchedule';
import { Provider } from '@ethersproject/providers'

interface ScheduleListProps {
  provider: Provider, 
  contract: Contract | undefined,
  account: string | null | undefined,
  schedules: Array<Schedule> | undefined,
  errorMsg: string,
  updateScheduleList: UpdateScheduleListFunc
}

export const ScheduleList: FC<ScheduleListProps> = ({provider, contract, account, schedules, errorMsg, updateScheduleList}) => {
  const [_errorMsg, setErrorMsg] = useState<string>()
  const [_schedules, setSchedules] = useState<Array<Schedule>>(new Array<Schedule>)
  const [accountUpperCase, setAccountUpperCase] = useState<string>()
  const _contract = contract

  function isPresentSchedule(s:Schedule) {
    const tsNow = new Date().getTime()
    //console.log("ScheduleList.tsx > isPresentSchedule() > startTS=", s.startTS*1000, ", endTS=", s.endTS*1000, ", tsNow=", tsNow)
    const r = (s.startTS*1000 <= tsNow && tsNow < s.endTS*1000)
    //console.log("ScheduleList.tsx > isPresentSchedule() > r=", r)
    return r
  }

  useEffect(() => {
    //console.log("ScheduleList.tsx > useEffect[]")
    //if (account)
      setAccountUpperCase(account ? account.toUpperCase() : "")
    console.log("ScheduleList.tsx > useEffect[] > _accountUpperCase: ", accountUpperCase)
    setErrorMsg("")
    if (errorMsg)
      setErrorMsg(errorMsg)
    
    if (contract) {
      //console.log("ScheduleList.tsx > useEffect[] 2")
      //updateSchedule()
    }
  },[])

  function cancelSchedule(s: Schedule) {
    console.log("<ScheduleList> cancelSchedule 1")
    //  TODO: change confirm windows to display the image so user can definitely confirm his cancelation
    if (false == window.confirm("Are you sure to cancel schedule: " + s.startDT + " ~ " + s.endDT)) {
      return;
    }
    console.log("<ScheduleList> cancelSchedule 2")

    const executeTransaction = async () => {
      console.log("<ScheduleList> cancelSchedule > executeTransaction")
      try {
        if (schedules) {
          s.successMsg = "Waiting for confirmation of cancelation..."
          const schedules2 = [...schedules]
          await setSchedules(schedules2)
          const r = await _contract?.removeSchedule(s.id)

          s.successMsg = "Waiting until transaction is done..."        
          const schedules3 = [...schedules]
          await setSchedules(schedules3)
        
          const waitResult = await provider.waitForTransaction(r.hash)
          console.log("ScheduleList.tsx > cancelSchedule> wait result: ", waitResult)
          updateScheduleList()

          window.alert("succeeded to cancel the schedule")
        }
      } catch (e) {
        window.alert(""+e)        
      }
      s.successMsg = ''
    }
    executeTransaction()
  }

  function showModifyUI(s: Schedule) {
    //console.log("ScheduleList.tsx > modifySchedule() > 1")
    if (schedules) {
      //console.log("ScheduleList.tsx > modifySchedule() > 2")      
      //schedules[s.index].onModify = true
      s.onModify = true
      //console.log(schedules)
      const schedules2 = [...schedules]
      setSchedules(schedules2)
      //updateScheduleList(false)
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
                {s.onModify ?
                  <ModifySchedule provider={provider} contract={contract} oldSchedule={s} updateScheduleList={updateScheduleList} />
                :
                  <div>
                    {s.startDT} ~ {s.endDT} [{s.booker.substring(0,6) + "..." + s.booker.substring(38, 42)}] [<a href={s.imgUrl} target="_blank">see image</a>]
                    {accountUpperCase == s.booker.toUpperCase() ? (<button onClick={(event:any) => showModifyUI(s)}>modify</button>) : <></>}
                    {accountUpperCase == s.booker.toUpperCase() && !isPresentSchedule(s) ? (<button onClick={(event:any) => cancelSchedule(s)}>cancel</button>) : <></>}
                  </div>
                  
                }                
                <div className="success">{s.successMsg}</div>
                <div className="error">{s.errorMsg}</div>
              </MultiDiv>
            </li>))
          }
        </ol>
      </MultiDiv>
    </div>

  )
}