import {Meta, StoryObj} from "@storybook/react"
import ProfileCharge from "../components/ProfileCharge"

type Story = StoryObj<typeof ProfileCharge>

const meta: Meta<typeof ProfileCharge> = {component: ProfileCharge}
const render = () => <ProfileCharge />

export const Default: Story = {
  render
}

export default meta
