import {type Meta, type StoryObj} from "@storybook/react"
import Typography, {
  TypographyVariant,
  type TypographyProps as TypographyProperties,
} from "../components/Typography"

type Story = StoryObj<typeof Typography>

const meta: Meta<typeof Typography> = {
  component: Typography,
}
const render = (arguments_: TypographyProperties) => (
  <Typography {...arguments_} />
)

export const Default: Story = {
  render,
  args: {
    children: "This is a default typography component.",
    variant: TypographyVariant.H1,
    as: "h1",
  },
}

export default meta
