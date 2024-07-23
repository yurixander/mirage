import {type Meta, type StoryObj} from "@storybook/react"
import Typography, {
  TypographyVariant,
  type TypographyProps,
} from "../components/Typography"
import React from "react"

type Story = StoryObj<typeof Typography>

const meta: Meta<typeof Typography> = {
  component: Typography,
}

const render = (args: TypographyProps): React.JSX.Element => (
  <Typography {...args} />
)

export const Default: Story = {
  render,
  args: {
    children: "This is a default typography component.",
    variant: TypographyVariant.HeadingLarge,
    as: "h1",
  },
}

export default meta
