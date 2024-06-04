import {type Meta, type StoryObj} from "@storybook/react"
import ProgressBar, {
  type ProgressBarProps,
  ProgressBarState,
} from "../components/ProgressBar"

type Story = StoryObj<typeof ProgressBar>

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
}
const render = (args: ProgressBarProps) => <ProgressBar {...args} />

export const Default: Story = {
  render,
  args: {
    className: "max-w-44",
    state: ProgressBarState.Error,
    progress: 51,
  },
}

export default meta
