import {type Meta, type StoryObj} from "@storybook/react"
import Typography, {
  TypographyVariant,
  type TypographyProps,
} from "../components/Typography"

type Story = StoryObj<typeof Typography>

const meta: Meta<typeof Typography> = {
  component: Typography,
}
const render = (args: TypographyProps) => <Typography {...args} />

export const Default: Story = {
  render,
  args: {
    children: "This is a default typography component.",
    variant: TypographyVariant.H1,
  },
}

export default meta
