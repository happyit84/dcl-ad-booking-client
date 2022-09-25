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


interface SceneScheduleDetailProps {
  library: any,
  chainId: number | undefined,
  id: number
}

export const SceneScheduleDetail: FC<SceneScheduleDetailProps> = ({library, chainId, id}) => 
{
  const _chainId: number = chainId == undefined ? 0 : chainId
  
  const [startTimeStamp, setStartTimeStamp] = useState<number>(0)
  
  useEffect(() => {
    const contractAddress = getSceneSchedulerAddress(_chainId)
    if (contractAddress != "") {
      const contract = new Contract(contractAddress, abi, library.getSigner())
      
      const fetchData = async () => {
        const result = await contract.getScheduleDetail(id)
        console.log(result)
        console.log(parseInt(result.startTimestamp))
        setStartTimeStamp(parseInt(result.startTimestamp))
      }

      console.log("try fetchData")
      fetchData()
    }
  }/*, []*/)

  return (
    <MultiDiv>
      <div>--------- Scene Schedule Detail ---------</div>
      <div>id = {id}</div>
      <div>startTimestamp: {startTimeStamp}</div>
    </MultiDiv>
  )
}
