import {useState, type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import IconButton from "./IconButton"
import {assert, validateUrl} from "@/utils/util"
import {IoMdMic, IoMdMicOff} from "react-icons/io"
import {IoPause, IoPlay, IoVolumeHigh} from "react-icons/io5"
import {MdCall, MdCallEnd} from "react-icons/md"
import {twMerge} from "tailwind-merge"
import AvatarImage, {AvatarType} from "./AvatarImage"

export enum VariantCall {
  CallInProgress,
  IncomingCall,
  Calling,
}

export type CallModalProps = {
  name: string
  variant: VariantCall
  avatarUrl?: string
}

const callAction: {[key in VariantCall]: string} = {
  [VariantCall.CallInProgress]: "Call in Progress...",
  [VariantCall.IncomingCall]: "Incoming Call...",
  [VariantCall.Calling]: "Connecting...",
}

const CallModal: FC<CallModalProps> = ({name, avatarUrl, variant}) => {
  const [action, setAction] = useState(variant)
  const [isMicEnabled, setIsMicEnabled] = useState(true)
  const [isSpeakerMode, setIsSpeakerMode] = useState(false)
  const [isCallPaused, setIsCallPaused] = useState(false)

  if (avatarUrl !== undefined) {
    assert(validateUrl(avatarUrl), "avatar URL should be valid if defined")
  }

  return (
    <div className="flex w-80 animate-enter flex-col rounded bg-white shadow-lg">
      <div className="flex items-center justify-center gap-2 p-3 px-5 shadow">
        <AvatarImage
          isRounded
          isLarge
          className="shadow"
          avatarType={AvatarType.Profile}
          displayName={name}
          avatarUrl={avatarUrl}
        />

        <div className="w-full px-3 text-center">
          <Typography
            className="text-black"
            variant={TypographyVariant.Heading}>
            {name}
          </Typography>

          <Typography
            className="text-black"
            variant={TypographyVariant.BodySmall}>
            {callAction[action]}
          </Typography>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 rounded-b border-t-2 border-t-slate-200 bg-gray-50 p-2">
        {action === VariantCall.IncomingCall ? (
          <>
            <IconButton
              className="rounded-full bg-green-400 p-3 shadow hover:bg-green-300"
              color="black"
              tooltip="Accept"
              Icon={MdCall}
              onClick={() => {
                setAction(VariantCall.CallInProgress)
                // TODO: Handle here incoming calls acceptance.
              }}
            />

            <CallDeclineButton
              onCallEnd={() => {
                throw new Error("Call end not handled.")
              }}
            />
          </>
        ) : (
          <>
            <IconButton
              className={twMerge(
                "rounded-full p-3 shadow",
                isSpeakerMode
                  ? "bg-purple-500 hover:bg-purple-300"
                  : "bg-slate-100"
              )}
              color="black"
              tooltip="Toggle speaker"
              Icon={IoVolumeHigh}
              onClick={() => {
                setIsSpeakerMode(!isSpeakerMode)

                throw new Error("Speaker mode not handled.")
              }}
            />

            <IconButton
              className="rounded-full bg-slate-100 p-3 shadow"
              color="black"
              tooltip="Toggle microphone"
              Icon={isMicEnabled ? IoMdMic : IoMdMicOff}
              onClick={() => {
                setIsMicEnabled(!isMicEnabled)

                throw new Error("Mic enabled/disabled not handled.")
              }}
            />

            <IconButton
              className="rounded-full bg-slate-100 p-3 shadow"
              color="black"
              tooltip={isCallPaused ? "Play" : "Pause"}
              Icon={isCallPaused ? IoPlay : IoPause}
              onClick={() => {
                setIsCallPaused(!isCallPaused)

                throw new Error("Call paused not handled.")
              }}
            />

            <CallDeclineButton
              onCallEnd={() => {
                throw new Error("Call end not handled.")
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}

const CallDeclineButton: FC<{onCallEnd: () => void}> = ({onCallEnd}) => {
  return (
    <IconButton
      className="rounded-full bg-red-400 p-3 shadow hover:bg-red-300 active:shadow-none"
      color="black"
      tooltip="Call off"
      onClick={onCallEnd}
      Icon={MdCallEnd}
    />
  )
}

export default CallModal
