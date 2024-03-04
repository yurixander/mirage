import Button, {ButtonVariant} from "@/components/Button"
import IconButton from "@/components/IconButton"
import useCachedCredentials from "@/hooks/matrix/useCachedCredentials"
import useConnection from "@/hooks/matrix/useConnection"
import {ViewPath, sendImageMessageFromFile} from "@/utils/util"
import {faPaperclip} from "@fortawesome/free-solid-svg-icons"
import {useCallback, useEffect, type FC} from "react"
import {createPortal} from "react-dom"
import {useNavigate} from "react-router-dom"
import {useFilePicker} from "use-file-picker"

const DevPreview: FC = () => {
  const {client, connect} = useConnection()
  const {credentials} = useCachedCredentials()
  const navigate = useNavigate()

  const {openFilePicker, filesContent, clear} = useFilePicker({
    accept: "image/*",
    multiple: false,
    readAs: "DataURL",
  })

  const sendImageMessage = useCallback(async () => {
    await sendImageMessageFromFile(
      filesContent[0],
      client,
      "!RkuAgcAbPsYlKTUZfz:matrix.org"
    )

    clear()
  }, [clear, client, filesContent])

  // Connect on startup.
  useEffect(() => {
    if (credentials === null) {
      return
    }

    void connect(credentials).then(async connectedAndSynced => {
      if (connectedAndSynced) {
        return
      }

      navigate(ViewPath.Login)
    })
  }, [connect, credentials, navigate])

  return (
    <div id="container">
      {filesContent.length > 0 &&
        createPortal(
          <div className="flex size-full flex-col items-center justify-center">
            <div className="flex max-h-[600px] max-w-[600px] flex-col gap-4">
              <img
                className="h-auto w-full rounded-lg object-cover shadow-md"
                src={filesContent[0].content}
              />

              <div className="flex w-full items-center justify-end gap-1">
                <Button
                  variant={ButtonVariant.Secondary}
                  onClick={() => {
                    clear()
                  }}
                  label={"Cancel"}
                />

                <Button
                  onClick={() => {
                    void sendImageMessage()
                  }}
                  label={"Send Image"}
                />
              </div>
            </div>
          </div>,
          document.getElementById("root") ?? document.body
        )}

      <IconButton
        onClick={() => {
          openFilePicker()
        }}
        tooltip="Attach"
        icon={faPaperclip}
      />
    </div>
  )
}

export default DevPreview
