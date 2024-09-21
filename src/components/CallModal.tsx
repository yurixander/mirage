import {useState, type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import {assert, validateUrl} from "@/utils/util"
import {IoMdMic, IoMdMicOff} from "react-icons/io"
import {IoPause, IoPlay, IoVolumeHigh} from "react-icons/io5"
import {MdCall, MdCallEnd} from "react-icons/md"
import {twMerge} from "tailwind-merge"
import AvatarImage, {AvatarSize, AvatarType} from "./AvatarImage"
import {LangKey} from "@/lang/allKeys"
import useTranslation from "@/hooks/util/useTranslation"
import {IconButton} from "./ui/button"

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

const callAction: {[key in VariantCall]: LangKey} = {
  [VariantCall.CallInProgress]: LangKey.CallInProgress,
  [VariantCall.IncomingCall]: LangKey.IncomingCall,
  [VariantCall.Calling]: LangKey.Connecting,
}

const CallModal: FC<CallModalProps> = ({name, avatarUrl, variant}) => {
  const [action, setAction] = useState(variant)
  const [isMicEnabled, setIsMicEnabled] = useState(true)
  const [isSpeakerMode, setIsSpeakerMode] = useState(false)
  const [isCallPaused, setIsCallPaused] = useState(false)
  const {t} = useTranslation()

  if (avatarUrl !== undefined) {
    assert(validateUrl(avatarUrl), "avatar URL should be valid if defined")
  }

  return (
    <div className="flex w-80 animate-enter flex-col rounded bg-white shadow-lg">
      <div className="flex items-center justify-center gap-2 p-3 px-5 shadow">
        <AvatarImage
          isRounded
          // TODO: Replace for size correct. @lazaroysr96
          avatarSize={AvatarSize.Normal}
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
            {t(callAction[action])}
          </Typography>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 rounded-b border-t-2 border-t-slate-200 bg-gray-50 p-2">
        {action === VariantCall.IncomingCall ? (
          <>
            <IconButton
              aria-label={t(LangKey.AcceptCall)}
              className="rounded-full bg-green-400 hover:bg-green-300"
              tooltip={t(LangKey.AcceptCall)}
              onClick={() => {
                setAction(VariantCall.CallInProgress)

                // TODO: Handle here incoming calls acceptance.
              }}>
              <MdCall />
            </IconButton>

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
                "rounded-full",
                isSpeakerMode
                  ? "bg-purple-500 text-white hover:bg-purple-400"
                  : "bg-slate-100"
              )}
              tooltip={t(LangKey.ToggleSpeaker)}
              onClick={() => {
                setIsSpeakerMode(!isSpeakerMode)

                // TODO: Speaker mode not handled.
              }}>
              <IoVolumeHigh />
            </IconButton>

            <IconButton
              className="rounded-full bg-slate-100"
              aria-label={t(LangKey.ToggleMicrophone)}
              tooltip={t(LangKey.ToggleMicrophone)}
              onClick={() => {
                setIsMicEnabled(!isMicEnabled)

                // TODO: Mic enabled/disabled not handled.
              }}>
              {isMicEnabled ? <IoMdMic /> : <IoMdMicOff />}
            </IconButton>

            <IconButton
              aria-label={t(LangKey.TogglePlayPause)}
              className="rounded-full bg-slate-100"
              tooltip={isCallPaused ? t(LangKey.Play) : t(LangKey.Pause)}
              onClick={() => {
                setIsCallPaused(!isCallPaused)

                // TODO: Call paused not handled.
              }}>
              {isCallPaused ? <IoPlay /> : <IoPause />}
            </IconButton>

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
  const {t} = useTranslation()

  return (
    <IconButton
      aria-label={t(LangKey.CallOf)}
      className="rounded-full hover:bg-red-400"
      variant="destructive"
      tooltip={t(LangKey.CallOf)}
      onClick={onCallEnd}>
      <MdCallEnd />
    </IconButton>
  )
}

export default CallModal
