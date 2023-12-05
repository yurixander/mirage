import {Meta, StoryObj} from "@storybook/react"
import ChatInput from "../components/ChatInput"

type Story = StoryObj<typeof ChatInput>

const meta: Meta<typeof ChatInput> = {component: ChatInput}
const render = () => <ChatInput />
export const Default: Story = {render}

export default meta
