import {type Meta, type StoryObj} from "@storybook/react"
import InputArea, {type InputAreaProps} from "../components/InputArea"

type Story = StoryObj<typeof InputArea>

const meta: Meta<typeof InputArea> = {
  component: InputArea,
}
const render = (args: InputAreaProps) => <InputArea {...args} />

export const Default: Story = {
  render,
  args: {onValueChange(value) {}, initiallyRows: 1},
}

export default meta
