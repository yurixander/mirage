import {useState, type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import IconButton from "./IconButton"
import AvatarImage, {AvatarType} from "./Avatar"
import {assert, validateUrl} from "@/utils/util"
import {IoMdMic, IoMdMicOff} from "react-icons/io"
import {IoCall, IoPause, IoVolumeHigh} from "react-icons/io5"
import {twMerge} from "tailwind-merge"

export type CallModalProps = {
  name: string
  avatarUrl?: string
  variant: Variant
}

export enum Variant {
  CallInProgress,
  IcomingCall,
  Calling,
}

const CallModal: FC<CallModalProps> = ({name, avatarUrl, variant}) => {
  const [action, setAction] = useState(variant)

  if (avatarUrl !== undefined) {
    assert(validateUrl(avatarUrl), "avatar URL should be valid if defined")
  }

  return (
    <div className="flex w-80 animate-enter flex-col rounded bg-white shadow-lg">
      <div className="flex items-center justify-center gap-2 p-3 px-5 shadow">
        <AvatarImage
          className="shadow"
          isRounded={true}
          isLarge={true}
          avatarType={AvatarType.Profile}
          displayName={name}
          avatarUrl={avatarUrl}
        />
        <div className="w-full px-3 text-center">
          <Typography className="text-black" variant={TypographyVariant.H2}>
            {name}
          </Typography>
          <Typography className="text-black" variant={TypographyVariant.P}>
            {action === Variant.CallInProgress
              ? "Call in Progress..."
              : action === Variant.IcomingCall
                ? "Incoming Call..."
                : action === Variant.Calling
                  ? "Conecting..."
                  : ""}
          </Typography>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 rounded-b border-t-2 border-t-slate-200 bg-gray-50 p-2">
        {action === Variant.IcomingCall ? (
          <IncomingCallButtons
            onClickAcept={() => {
              setAction(Variant.CallInProgress)
              // TODO: Implement function to accept incoming calls
            }}
            onClickCancel={() => {
              // TODO: Implement function to reject calls
            }}
          />
        ) : (
          <CallInProgressButtons
            onClickSpeaker={() => {
              // TODO: Implement function to turn audio output on and off by speaker
            }}
            onClickMic={() => {
              // TODO: Implement function to turn the microphone on or off
            }}
            onClickPause={() => {
              // TODO: Implement pause call function
            }}
            onClickCallEnd={() => {
              // TODO: Implement function to terminate calls
            }}
          />
        )}
      </div>
    </div>
  )
}

const IncomingCallButtons: FC<{
  onClickAcept: () => void
  onClickCancel: () => void
}> = ({onClickAcept, onClickCancel}) => {
  return (
    <>
      <IconButton
        className="rounded-full bg-green-400 p-3 shadow hover:bg-green-300"
        color="black"
        tooltip="Calling"
        onClick={onClickAcept}
        Icon={IoCall}
      />

      <IconButton
        className="rotate-[135deg] rounded-full bg-red-400 p-3 shadow hover:bg-red-300 active:shadow-none"
        color="black"
        tooltip="Call off"
        onClick={onClickCancel}
        Icon={IoCall}
      />
    </>
  )
}

const CallInProgressButtons: FC<{
  onClickSpeaker: () => void
  onClickMic: () => void
  onClickPause: () => void
  onClickCallEnd: () => void
}> = ({onClickSpeaker, onClickMic, onClickPause, onClickCallEnd}) => {
  const [micState, setMicState] = useState(true)
  const [isSpeacker, setIsSpeacker] = useState(false)
  const [isCallPause, setIsCallPause] = useState(false)

  return (
    <>
      <IconButton
        className={twMerge(
          "rounded-full p-3 shadow",
          isSpeacker ? "bg-purple-400 hover:bg-purple-300" : "bg-slate-100"
        )}
        color="black"
        tooltip="Audio"
        onClick={() => {
          setIsSpeacker(!isSpeacker)
          onClickSpeaker()
        }}
        Icon={IoVolumeHigh}
      />

      <IconButton
        className="rounded-full bg-slate-100 p-3 shadow"
        color="black"
        tooltip="Mic off"
        onClick={() => {
          setMicState(!micState)
          onClickMic()
        }}
        Icon={micState ? IoMdMic : IoMdMicOff}
      />

      <IconButton
        className={twMerge(
          "rounded-full p-3 shadow",
          isCallPause ? "bg-purple-400 hover:bg-purple-300" : "bg-slate-100"
        )}
        color="black"
        tooltip="Pause"
        onClick={() => {
          setIsCallPause(!isCallPause)
          onClickPause()
        }}
        Icon={IoPause}
      />

      <IconButton
        className="rotate-[135deg] rounded-full bg-red-400 p-3 shadow hover:bg-red-300 active:shadow-none"
        color="black"
        tooltip="Call off"
        onClick={onClickCallEnd}
        Icon={IoCall}
      />
    </>
  )
}

export default CallModal
