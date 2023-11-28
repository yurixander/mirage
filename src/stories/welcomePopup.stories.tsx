import {Meta, StoryObj} from "@storybook/react"
import WelcomePopup from "../components/WelcomePopup"

type Story = StoryObj<typeof WelcomePopup>

const meta: Meta<typeof WelcomePopup> = {component: WelcomePopup}
const render = () => <WelcomePopup />

export const Default: Story = {
  render
}

export default meta
