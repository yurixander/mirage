import {type Meta, type StoryObj} from "@storybook/react"
import Typography, {type TypographyProps} from "../components/Typography"

type Story = StoryObj<typeof Typography>

const meta: Meta<typeof Typography> = {
  component: Typography,
}
const render = (args: TypographyProps) => <Typography {...args} />

export const Default: Story = {
  render,
  args: {
    children: "Este es un parrafo",
    variant: "h1",
  },
}

export default meta
