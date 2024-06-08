import {useState, type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import IconButton from "./IconButton"
import AvatarImage, {AvatarType} from "./Avatar"
import {assert, validateUrl} from "@/utils/util"
import {IoMdMic, IoMdMicOff} from "react-icons/io"
import {IoCall, IoPause, IoPlay, IoVolumeHigh} from "react-icons/io5"
import {twMerge} from "tailwind-merge"

export type CallModalProps = {
  name: string
  variant: VariantCall
  avatarUrl?: string
}

export enum VariantCall {
  CallInProgress,
  IncomingCall,
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
            {getCallAction(action)}
          </Typography>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 rounded-b border-t-2 border-t-slate-200 bg-gray-50 p-2">
        {action === VariantCall.IncomingCall ? (
          <IncomingCallButtons
            onClickAcept={() => {
              setAction(VariantCall.CallInProgress)
              // TODO: Accept incoming calls
            }}
            onClickCancel={() => {
              // TODO: Reject calls
            }}
          />
        ) : (
          <CallInProgressButtons
            onClickSpeaker={() => {
              // TODO: Turn audio output on and off by speaker
            }}
            onClickMic={() => {
              // TODO: Turn the microphone on or off
            }}
            onClickPaused={() => {
              // TODO: Pause call
            }}
            onClickCallEnd={() => {
              // TODO: End call
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
        tooltip="Accept"
        onClick={onClickAcept}
        Icon={IoCall}
      />

      <IconButton
        className="rotate-[135deg] rounded-full bg-red-400 p-3 shadow hover:bg-red-300 active:shadow-none"
        color="black"
        tooltip="Decline"
        onClick={onClickCancel}
        Icon={IoCall}
      />
    </>
  )
}

const CallInProgressButtons: FC<{
  onClickSpeaker: () => void
  onClickMic: () => void
  onClickPaused: () => void
  onClickCallEnd: () => void
}> = ({onClickSpeaker, onClickMic, onClickPaused, onClickCallEnd}) => {
  const [isMicEnabled, setIsMicEnabled] = useState(true)
  const [isSpeackerMode, setIsSpeackerMode] = useState(false)
  const [isCallPaused, setIsCallPaused] = useState(false)

  return (
    <>
      <IconButton
        className={twMerge(
          "rounded-full p-3 shadow",
          isSpeackerMode ? "bg-purple-400 hover:bg-purple-300" : "bg-slate-100"
        )}
        color="black"
        tooltip="Toggle speaker"
        onClick={() => {
          setIsSpeackerMode(!isSpeackerMode)
          onClickSpeaker()
        }}
        Icon={IoVolumeHigh}
      />

      <IconButton
        className="rounded-full bg-slate-100 p-3 shadow"
        color="black"
        tooltip="Toggle microphone"
        onClick={() => {
          setIsMicEnabled(!isMicEnabled)
          onClickMic()
        }}
        Icon={isMicEnabled ? IoMdMic : IoMdMicOff}
      />

      <IconButton
        className="rounded-full bg-slate-100 p-3 shadow"
        color="black"
        tooltip={isCallPaused ? "Play" : "Pause"}
        onClick={() => {
          setIsCallPaused(!isCallPaused)
          onClickPaused()
        }}
        Icon={isCallPaused ? IoPlay : IoPause}
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

const getCallAction = (action: VariantCall) => {
  switch (action) {
    case VariantCall.CallInProgress: {
      return "Call in Progress..."
    }

    case VariantCall.Calling: {
      return "Conecting..."
    }

    case VariantCall.IncomingCall: {
      return "Incoming Call..."
    }
  }
}

export default CallModal
