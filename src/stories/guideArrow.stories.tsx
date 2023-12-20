import {type Meta, type StoryObj} from "@storybook/react"
import GuideArrow, {
  GuideArrowOrientation,
  type GuideArrowProps,
} from "../components/GuideArrow"

type Story = StoryObj<typeof GuideArrow>

const meta: Meta<typeof GuideArrow> = {component: GuideArrow}
const render = (args: GuideArrowProps) => <GuideArrow {...args} />

export const LeftOrientation: Story = {
  render,
  args: {
    text: "This is some magical text!",
    orientation: GuideArrowOrientation.Left,
  },
}

export const RightOrientation: Story = {
  render,
  args: {
    text: "This is some magical text!",
    orientation: GuideArrowOrientation.Right,
  },
}

export const LongText: Story = {
  render,
  args: {
    text: "This is some magical text! It's also a long text. Very long text.",
    orientation: GuideArrowOrientation.Right,
  },
}

export default meta
