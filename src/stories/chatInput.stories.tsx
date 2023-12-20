import {type Meta, type StoryObj} from "@storybook/react"
import ChatInput, {type ChatInputProps} from "../components/ChatInput"

type Story = StoryObj<typeof ChatInput>

const meta: Meta<typeof ChatInput> = {component: ChatInput}
const render = (args: ChatInputProps) => <ChatInput {...args} />
export const Default: Story = {
  render,
  args: {},
}

export const Disabled: Story = {
  render,
  args: {
    isDisabled: true,
  },
}

export const ReplyMode: Story = {
  render,
  args: {
    isReplyMode: true,
  },
}

export default meta
