import {type Meta, type StoryObj} from "@storybook/react"
import Dropdown from "../components/Dropdown"

type Story = StoryObj<typeof Dropdown>

const meta: Meta<typeof Dropdown> = {component: Dropdown}

export const Default: Story = {
  render: () => (
    <Dropdown
      options={[
        {label: "Option 1", value: "1", onClick: () => {}},
        {label: "Option 2", value: "2", onClick: () => {}},
        {label: "Option 3", value: "3", onClick: () => {}},
      ]}
    />
  ),
}

export default meta
