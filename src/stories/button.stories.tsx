import {Meta, StoryObj} from "@storybook/react"
import Button, {ButtonProps, ButtonStyle} from "../components/Button"

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
}

const Template = (args: ButtonProps) => <Button {...args} />

export const Primary: Story = Template.bind({})

Primary.args = {
  text: "Primary",
  style: ButtonStyle.Primary,
  onClick: () => { },
}

export default meta
