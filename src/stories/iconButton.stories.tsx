import {Meta, StoryObj} from "@storybook/react"
import IconButton, {IconButtonProps} from "../components/IconButton"
import {ReactComponent as SettingsIcon} from "../../public/icons/cog.svg"

type Story = StoryObj<typeof IconButton>

const meta: Meta<typeof IconButton> = {component: IconButton}
const render = (args: IconButtonProps) => <IconButton {...args} />

export const Settings: Story = {
  render,
  args: {
    icon: SettingsIcon,
    onClick: () => { },
    tooltip: "Settings",
    tooltipPlacement: "right"
  }
}

export default meta
