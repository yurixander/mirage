import {Meta, StoryObj} from "@storybook/react"
import SearchBar, {SearchBarProps} from "../components/SearchBar"

type Story = StoryObj<typeof SearchBar>

const meta: Meta<typeof SearchBar> = {component: SearchBar}

export const Default: Story = {
  render: (args: SearchBarProps) => <SearchBar {...args} />,
  args: {}
}

export default meta
