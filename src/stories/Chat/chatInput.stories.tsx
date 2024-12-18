import {type Meta, type StoryObj} from "@storybook/react"
import ChatInput, {
  type ChatInputProps,
} from "@/containers/RoomContainer/ChatInput"

type Story = StoryObj<typeof ChatInput>

const meta: Meta<typeof ChatInput> = {
  component: ChatInput,
}
const render = (args: ChatInputProps): React.JSX.Element => (
  <ChatInput {...args} />
)

export const Default: Story = {
  render,
  args: {
    roomId: "room_id_test",
    isInputDisabled: false,
    onPickFile(_file) {},
    onSendTypingEvent(_roomId) {},
    onSendAudio: async () => {},
    onSendMessageText(_messageSendRequest) {},
  },
}

export const IsDisabled: Story = {
  render,
  args: {
    roomId: "room_id_test",
    isInputDisabled: true,
    onPickFile(_file) {},
    onSendTypingEvent(_roomId) {},
    onSendAudio: async () => {},
    onSendMessageText(_messageSendRequest) {},
  },
}

export default meta
