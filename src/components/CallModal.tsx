import {type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import IconButton from "./IconButton"
import {
  FaGripHorizontal,
  FaPhoneSlash,
  FaPhoneVolume,
  FaWrench,
} from "react-icons/fa"
import AvatarImage, {AvatarType} from "./Avatar"
import {assert, validateUrl} from "@/utils/util"

export type CallModalProps = {
  name: string
  time: string
  avatarUrl?: string
}

const CallModal: FC<CallModalProps> = ({name, time, avatarUrl}) => {
  if (avatarUrl !== undefined) {
    assert(validateUrl(avatarUrl), "avatar URL should be valid if defined")
  }

  return (
    <div>
      <div className="flex max-w-80 flex-col bg-white shadow-lg">
        <div className="flex items-center justify-center gap-2 p-3 px-5">
          <div>
            <AvatarImage
              isRounded={false}
              isLarge={true}
              avatarType={AvatarType.Profile}
              displayName={name}
              avatarUrl={avatarUrl}
            />
          </div>
          <div className="w-full px-3 text-center">
            <Typography className="text-black" variant={TypographyVariant.H2}>
              {name}
            </Typography>
            <Typography className="text-black" variant={TypographyVariant.P}>
              Call in Progress - {time}
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 border-t-2 border-t-slate-200 bg-gray-50 p-2">
          <IconButton
            className="bg-slate-100 p-2"
            color="#000000"
            tooltip="Call"
            onClick={() => {}}
            Icon={FaPhoneVolume}
          />
          <IconButton
            className="bg-slate-100 p-2"
            color="#000000"
            tooltip="Call"
            onClick={() => {}}
            Icon={FaGripHorizontal}
          />
          <IconButton
            className="bg-slate-100 p-2"
            color="#000000"
            tooltip="Call"
            onClick={() => {}}
            Icon={FaWrench}
          />
          <IconButton
            className="bg-red-400 p-2"
            color="#000000"
            tooltip="Call"
            onClick={() => {}}
            Icon={FaPhoneSlash}
          />
        </div>
      </div>
    </div>
  )
}

export default CallModal
