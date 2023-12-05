import {Meta, StoryObj} from "@storybook/react"
import IconButton, {IconButtonProps} from "../components/IconButton"
import {faGear} from "@fortawesome/free-solid-svg-icons"

type Story = StoryObj<typeof IconButton>

const meta: Meta<typeof IconButton> = {component: IconButton}
const render = (args: IconButtonProps) => <IconButton {...args} />

export const Settings: Story = {
  render,
  args: {
    icon: faGear,
    onClick: () => { },
    tooltip: "Settings",
    tooltipPlacement: "right"
  }
}

export default meta
