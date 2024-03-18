import {type Meta, type StoryObj} from "@storybook/react"
import CreateRoom from "../components/CreateRoom"

type Story = StoryObj<typeof CreateRoom>

const meta: Meta<typeof CreateRoom> = {component: CreateRoom}

export const Default: Story = {
  render: () => <CreateRoom />,
}

export default meta
