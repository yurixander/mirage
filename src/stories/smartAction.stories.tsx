import {type Meta, type StoryObj} from "@storybook/react"
import SmartAction, {type SmartActionProps as SmartActionProperties} from "../components/SmartAction"
import {faStarOfLife} from "@fortawesome/free-solid-svg-icons"

type Story = StoryObj<typeof SmartAction>

const meta: Meta<typeof SmartAction> = {component: SmartAction}
const render = (arguments_: SmartActionProperties) => <SmartAction {...arguments_} />

export const Default: Story = {
  render,
  args: {
    icon: faStarOfLife,
    text: "This is a smart action",
    onClick: () => {},
  },
}

export default meta
