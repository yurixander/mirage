import {Meta, StoryObj} from "@storybook/react"
import BottomSmartAction, {BottomSmartActionProps} from "../components/BottomSmartAction"
import {faStarOfLife} from '@fortawesome/free-solid-svg-icons'

type Story = StoryObj<typeof BottomSmartAction>

const meta: Meta<typeof BottomSmartAction> = {component: BottomSmartAction}
const render = (args: BottomSmartActionProps) => <BottomSmartAction {...args} />

export const Default: Story = {
  render,
  args: {
    icon: faStarOfLife,
    text: "Help & guides",
    onClick: () => { }
  }
}

export default meta
