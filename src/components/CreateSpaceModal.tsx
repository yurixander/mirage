import {useState, type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import IconButton from "./IconButton"
import {IoCloseCircle} from "react-icons/io5"
import InputSection from "./InputSection"
import {ReactSVG} from "react-svg"
import {StaticAssetPath} from "@/utils/util"
import Button, {ButtonSize} from "./Button"
import InputArea from "./InputArea"
import UploadAvatar from "./UploadAvatar"
import useConnection from "@/hooks/matrix/useConnection"

const CreateSpaceModal: FC<{onClose: () => void}> = ({onClose}) => {
  const {client} = useConnection()
  const [spaceName, setSpaceName] = useState("")
  const [spaceDescription, setSpaceDescription] = useState("")

  return (
    <div className="flex max-w-md flex-col overflow-hidden rounded-md border border-slate-300 bg-white">
      <div className="flex w-full items-center justify-between border-b border-slate-300 bg-gray-50 py-3 pl-6 pr-3">
        <Typography className="font-bold text-black" as="span">
          New Space
        </Typography>

        <IconButton
          tooltip="Close Modal"
          Icon={IoCloseCircle}
          onClick={onClose}
        />
      </div>

      <div className="flex flex-col gap-6 border-b border-slate-300 p-6">
        <div className="flex items-center gap-2">
          <UploadAvatar
            onImageUploaded={function (matrixSrc: string): void {
              throw new Error("Function not implemented.")
            }}
          />

          <div className="flex flex-col">
            <Typography
              className="font-bold text-black"
              variant={TypographyVariant.H3}>
              Create Space
            </Typography>

            <Typography variant={TypographyVariant.P}>
              Spaces are a new way of grouping rooms and people. What kind of
              space you want to create you can change
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <InputSection
            title="Space Name"
            placeholder="Ej. Figma Community"
            onValueChange={setSpaceName}
          />

          {/* TODO: This input description prefer use `text-area` */}
          <div className="flex flex-col gap-1">
            <Typography variant={TypographyVariant.Span}>
              Description
            </Typography>

            <InputArea
              className="w-full"
              onValueChange={setSpaceDescription}
              value={spaceDescription}
              placeholder="Write a brief description of what your space will be about."
            />
          </div>
        </div>

        <div className="flex gap-1 overflow-hidden">
          <ReactSVG src={StaticAssetPath.DotGrid} />

          <ReactSVG src={StaticAssetPath.DotGrid} />
        </div>
      </div>

      <div className="flex justify-end bg-gray-50 p-3">
        <Button
          size={ButtonSize.Small}
          label="Create Space"
          isDisabled={client === null}
          onClick={function (): void {
            throw new Error("Implement here `Create Space` functionality")
          }}
        />
      </div>
    </div>
  )
}

export default CreateSpaceModal
