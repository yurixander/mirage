import NavigationSection from "@/containers/NavigationSection"
import {type Meta, type StoryObj} from "@storybook/react"

type Story = StoryObj<typeof NavigationSection>

const meta: Meta<typeof NavigationSection> = {
  component: NavigationSection,
}

const render = () => <NavigationSection />

export const Default: Story = {
  render,
  args: {},
}

export default meta
