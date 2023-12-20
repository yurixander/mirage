import {type Meta, type StoryObj} from "@storybook/react"
import Loader, {type LoaderProps} from "../components/Loader"

type Story = StoryObj<typeof Loader>

const meta: Meta<typeof Loader> = {component: Loader}

export const Default: Story = {
  render: (args: LoaderProps) => <Loader {...args} />,
  args: {text: "Loading"},
}

export default meta
