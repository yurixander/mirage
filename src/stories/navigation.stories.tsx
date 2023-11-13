import {Meta, StoryObj} from "@storybook/react"
import Navigation from "../components/Navigation"

type Story = StoryObj<typeof Navigation>

const meta: Meta<typeof Navigation> = {component: Navigation}
const render = () => <Navigation />

export const DefaultNav: Story = {
  render,
  args: {}
}

export default meta