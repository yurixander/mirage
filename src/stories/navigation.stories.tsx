import {Meta, StoryObj} from "@storybook/react"
import Navigation, {NavigationProps} from "../components/Navigation"

type Story = StoryObj<typeof Navigation>

const meta: Meta<typeof Navigation> = {component: Navigation}
const render = (args: NavigationProps) => <Navigation {...args} />

export const DefaultNav: Story = {
  render,
  args: {
    servers: [
      {
        isActive: true,
        tooltip: "Server 1",
        onClick: () => { }
      }, {
        isActive: false,
        tooltip: "Server 2",
        onClick: () => { }
      }
      , {
        isActive: false,
        tooltip: "Server 3",
        onClick: () => { }
      }
    ]
  }
}

export default meta
