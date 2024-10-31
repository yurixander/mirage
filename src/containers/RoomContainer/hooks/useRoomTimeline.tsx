import useValueState, {type ValueState} from "@/hooks/util/useValueState"
import {type AnyMessage} from "./useRoomChat"
import {type Room} from "matrix-js-sdk"
import {useEffect} from "react"

type UseRoomTimelineReturnType = ValueState<AnyMessage[]>

const useRoomTimeline = (room: Room | null): UseRoomTimelineReturnType => {
  const [anyMessagesState, setAnyMessagesState] = useValueState<AnyMessage[]>()

  useEffect(() => {}, [])

  return anyMessagesState
}

export default useRoomTimeline
