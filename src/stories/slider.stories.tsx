import {type Meta, type StoryObj} from "@storybook/react"
import Slider, {type SliderProps} from "../components/Slider"
import {IoIosCall, IoIosVolumeHigh} from "react-icons/io"

type Story = StoryObj<typeof Slider>

const meta: Meta<typeof Slider> = {
  component: Slider,
}
const render = (args: SliderProps) => <Slider {...args} />

export const Default: Story = {
  render,
  args: {
    label: "Media Volume",
    onInput: () => {},
    Icon: IoIosVolumeHigh,
  },
}

export const Step: Story = {
  render,
  args: {
    label: "Call Volume",
    onInput: () => {},
    Icon: IoIosCall,
    isVariantBasic: false,
    step: 20,
  },
}
export default meta
