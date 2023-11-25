import {Meta, StoryObj} from "@storybook/react"
import BottomSmartAction, {BottomSmartActionProps} from "../components/BottomSmartAction"
import {ReactComponent as StarIcon} from "../../public/icons/star.svg"

type Story = StoryObj<typeof BottomSmartAction>

const meta: Meta<typeof BottomSmartAction> = {component: BottomSmartAction}
const render = (args: BottomSmartActionProps) => <BottomSmartAction {...args} />

export const Default: Story = {
  render,
  args: {
    icon: StarIcon,
    text: "Help & guides",
    onClick: () => { }
  }
}

export default meta