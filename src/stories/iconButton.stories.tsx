import {type Meta, type StoryObj} from "@storybook/react"
import IconButton, {type IconButtonProps} from "../components/IconButton"
import {faGear, faBell} from "@fortawesome/free-solid-svg-icons"

type Story = StoryObj<typeof IconButton>

const meta: Meta<typeof IconButton> = {component: IconButton}
const render = (args: IconButtonProps) => <IconButton {...args} />

export const Settings: Story = {
  render,
  args: {
    icon: faGear,
    onClick: () => {},
    tooltip: "Settings",
  },
}

export const Disabled: Story = {
  render,
  args: {
    icon: faGear,
    onClick: () => {},
    tooltip: "Settings",
    isDisabled: true,
  },
}

export const WithDot: Story = {
  render,
  args: {
    icon: faBell,
    onClick: () => {},
    tooltip: "Settings",
    isDotVisible: true,
  },
}

export default meta
