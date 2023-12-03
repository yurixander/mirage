import {Meta, StoryObj} from "@storybook/react"
import ScrollableAnimation from "../components/ScrollableAnimation"

type Story = StoryObj<typeof ScrollableAnimation>

const meta: Meta<typeof ScrollableAnimation> = {component: ScrollableAnimation}
const render = () => <ScrollableAnimation />

export const Default: Story = {
  render
}

export default meta
