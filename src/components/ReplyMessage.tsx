import {type FC} from "react"
import MessageContainer from "./MessageContainer"
import {stringToColor} from "@/utils/util"

type ReplyMessageProps = {
  fromMessage: string
  message: string
  authorDisplayName: string
  fromAuthorDisplayName: string
}
const ReplyMessage: FC<ReplyMessageProps> = ({
  fromMessage,
  message,
  fromAuthorDisplayName,
  authorDisplayName,
}) => {
  return (
    <div>
      <MessageContainer
        authorDisplayName={authorDisplayName}
        authorDisplayNameColor={stringToColor(authorDisplayName)}
        children={
          <div>
            <div className="w-full rounded border-l-2 border-red-500 bg-slate-300 p-2">
              <div>
                <span
                  className="select-text font-semibold"
                  style={{color: stringToColor(fromAuthorDisplayName)}}
                  aria-hidden="true">
                  {fromAuthorDisplayName}
                </span>
              </div>
              <div className="max-w-messageMaxWidth">{fromMessage}</div>
            </div>
            <div className="max-w-messageMaxWidth">{message}</div>
          </div>
        }
        timestamp={Date.now()}
        onAuthorClick={() => {}}
      />
    </div>
  )
}

export default ReplyMessage
