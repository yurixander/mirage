import {type Meta, type StoryObj} from "@storybook/react"
import SearchBar, {
  type SearchBarProps as SearchBarProperties,
} from "../components/SearchBar"

type Story = StoryObj<typeof SearchBar>

const meta: Meta<typeof SearchBar> = {component: SearchBar}

export const Default: Story = {
  render: (arguments_: SearchBarProperties) => <SearchBar {...arguments_} />,
  args: {onQueryChange: () => []},
}

export const WithResults: Story = {
  render: (arguments_: SearchBarProperties) => <SearchBar {...arguments_} />,
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
