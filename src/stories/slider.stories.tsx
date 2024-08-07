import {type Meta, type StoryObj} from "@storybook/react"
import Slider, {type SliderProps} from "../components/Slider"
import React from "react"

type Story = StoryObj<typeof Slider>

const meta: Meta<typeof Slider> = {
  component: Slider,
}

const render = (args: SliderProps): React.JSX.Element => <Slider {...args} />

export const Default: Story = {
  render,
  args: {
    max: 100,
    min: 0,
    onProgressChange: () => {},
    value: 50,
  },
}

export const Step: Story = {
  render,
  args: {
    max: 100,
    min: 0,
    onProgressChange: () => {},
    step: 20,
    value: 40,
  },
}
export default meta
