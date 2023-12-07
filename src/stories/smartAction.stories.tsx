import {Meta, StoryObj} from "@storybook/react"
import SmartAction, {SmartActionProps} from "../components/SmartAction"
import {faStarOfLife} from "@fortawesome/free-solid-svg-icons"

type Story = StoryObj<typeof SmartAction>

const meta: Meta<typeof SmartAction> = {component: SmartAction}
const render = (args: SmartActionProps) => <SmartAction {...args} />

export const Default: Story = {
  render,
  args: {
    icon: faStarOfLife,
    text: "This is a smart action",
    onClick: () => { }
  }
}

export default meta
