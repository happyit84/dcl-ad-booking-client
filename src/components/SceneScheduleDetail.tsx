import {FC} from 'react';
import MultiDiv from './MultiDiv'


type SceneScheduleDetailProps = {
  id: number
}

export const SceneScheduleDetail: FC<SceneScheduleDetailProps> = ({id}) => {
  return (
    <MultiDiv>
      <div>뭐야 이게1 = {id}</div>
      <div>뭐야 이게2 = {id}</div>
    </MultiDiv>
  )
}
