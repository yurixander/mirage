import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import ProgressBar, {
  type ProgressBarProps,
  ProgressBarState,
  ProgressBarVariant,
} from "../components/ProgressBar"

type Story = StoryObj<typeof ProgressBar>

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
}
const render = (args: ProgressBarProps): React.JSX.Element => (
  <ProgressBar {...args} />
)

export const LinearProgress: Story = {
  render,
  args: {
    className: "max-w-44",
    state: ProgressBarState.Progress,
    progress: 51,
  },
}

export const LinearError: Story = {
  render,
  args: {
    className: "max-w-44",
    state: ProgressBarState.Error,
    progress: 51,
  },
}

export const LinearCompleted: Story = {
  render,
  args: {
    className: "max-w-44",
    state: ProgressBarState.Completed,
    progress: 51,
  },
}

export const CircularProgress: Story = {
  render,
  args: {
    state: ProgressBarState.Progress,
    variant: ProgressBarVariant.Circular,
    progress: 51,
  },
}

export const CircularError: Story = {
  render,
  args: {
    state: ProgressBarState.Error,
    variant: ProgressBarVariant.Circular,
    progress: 51,
  },
}

export const CircularCompleted: Story = {
  render,
  args: {
    state: ProgressBarState.Completed,
    variant: ProgressBarVariant.Circular,
    progress: 51,
  },
}

export default meta
