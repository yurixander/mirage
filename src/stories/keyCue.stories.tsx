import {type Meta, type StoryObj} from "@storybook/react"
import KeyCue, {type KeyCueProps} from "../components/KeyCue"
import React from "react"

type Story = StoryObj<typeof KeyCue>

const meta: Meta<typeof KeyCue> = {component: KeyCue}

const render = (args: KeyCueProps): React.JSX.Element => <KeyCue {...args} />

export const KeyOnly: Story = {
  render,
  args: {char: "A"},
}

export const AllModifiers: Story = {
  render,
  args: {
    char: "A",
    alt: true,
    ctrl: true,
    shift: true,
  },
}

export default meta
