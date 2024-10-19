import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import ChatContainerLoader from "../../containers/RoomContainer/MessagesPlaceholder"

type Story = StoryObj<typeof ChatContainerLoader>

const meta: Meta<typeof ChatContainerLoader> = {
  component: ChatContainerLoader,
}

const render = (): React.JSX.Element => <ChatContainerLoader />

export const Default: Story = {
  render,
}

export default meta
