import {Meta, StoryObj} from "@storybook/react"
import Button, {ButtonProps, ButtonStyle} from "../components/Button"

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {component: Button}

export const Default: Story = {
  render: (args: ButtonProps) => <Button {...args} />,
  args: {
    text: "This is a button",
    style: ButtonStyle.Primary,
    onClick: () => { },
  }
}

export default meta
