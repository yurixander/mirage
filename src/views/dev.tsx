import {useState, type FC} from "react"
import {IoSend} from "react-icons/io5"
import {motion} from "framer-motion"
import {delay} from "@/utils/util"
import ChatInput from "@/containers/RoomContainer/ChatInput"

const DevelopmentPreview: FC = () => {
  // const [anim, setAnim] = useState(false)
  // const [exitAnimation, setExitAnimation] = useState(false)

  // const startAnimSend = async (): Promise<void> => {
  //   setAnim(true)

  //   await delay(300)

  //   setExitAnimation(true)
  //   setAnim(false)

  //   await delay(250)

  //   setExitAnimation(false)
  // }

  return (
    <>
      <div className="flex size-full items-center justify-center">
        {/* {!exitAnimation && (
          <motion.div
            initial={{scale: 0.5, x: 0}}
            whileInView={{scale: 1}}
            animate={{
              scaleY: anim ? 0.6 : 1,
              x: anim ? 100 : 0,
              opacity: anim ? 0 : 1,
              transition: {
                x: {delay: 0.2},
                opacity: {delay: 0.2},
              },
            }}>
            <IoSend
              onClick={() => {
                void startAnimSend()
              }}
              className="size-6 text-blue-500"
            />
          </motion.div>
        )} */}

        <ChatInput
          isInputDisabled={false}
          roomId=""
          onSendMessageText={messageSendRequest => {}}
          onPickFile={file => {
            throw new Error("Attach file not implemented.")
          }}
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
