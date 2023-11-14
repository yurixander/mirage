import {Meta, StoryObj} from "@storybook/react"
import Roster from "../components/Roster"

type Story = StoryObj<typeof Roster>

const meta: Meta<typeof Roster> = {component: Roster}
const render = () => <Roster />

export const Default: Story = {
  render,
  args: {}
}

export default meta
