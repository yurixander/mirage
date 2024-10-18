import type {Meta, StoryObj} from "@storybook/react"
import ChatContainerLoader from "../../containers/RoomContainer/MessagesPlaceholder"
import type React from "react"

type Story = StoryObj<typeof ChatContainerLoader>

const meta: Meta<typeof ChatContainerLoader> = {
  component: ChatContainerLoader,
}

const render = (): React.JSX.Element => <ChatContainerLoader />

export const Default: Story = {
  render,
}

export default meta
