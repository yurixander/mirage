import {type Meta, type StoryObj} from "@storybook/react"
import CreateSpaceModal from "../components/CreateSpaceModal"

type Story = StoryObj<typeof CreateSpaceModal>

const meta: Meta<typeof CreateSpaceModal> = {
  component: CreateSpaceModal,
}
const render = () => <CreateSpaceModal onClose={() => {}} />

export const Default: Story = {
  render,
  args: {},
}

export default meta
