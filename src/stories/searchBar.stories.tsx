import {type Meta, type StoryObj} from "@storybook/react"
import SearchBar, {type SearchBarProps} from "../components/SearchBar"

type Story = StoryObj<typeof SearchBar>

const meta: Meta<typeof SearchBar> = {component: SearchBar}

export const Default: Story = {
  render: (args: SearchBarProps) => <SearchBar {...args} />,
  args: {onQueryChange: () => []},
}

export const WithResults: Story = {
  render: (args: SearchBarProps) => <SearchBar {...args} />,
  args: {
    onQueryChange: (_query: string) => [
      {
        text: "Result 1",
        onClick: () => {},
      },
      {
        text: "Result 2",
        onClick: () => {},
      },
      {
        text: "Result 3",
        onClick: () => {},
      },
    ],
  },
}

export default meta
