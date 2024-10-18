import type {Meta, StoryObj} from "@storybook/react"
import InputArea, {type InputAreaProps} from "../components/InputArea"
import type React from "react"

type Story = StoryObj<typeof InputArea>

const meta: Meta<typeof InputArea> = {
  component: InputArea,
}

const render = (args: InputAreaProps): React.JSX.Element => (
  <InputArea {...args} />
)

export const Default: Story = {
  render,
  args: {onValueChange() {}, initiallyRows: 1},
}

export default meta
