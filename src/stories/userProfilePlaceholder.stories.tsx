import {type Meta, type StoryObj} from "@storybook/react"
import UserProfilePlaceholder from "../components/UserProfilePlaceholder"

type Story = StoryObj<typeof UserProfilePlaceholder>

const meta: Meta<typeof UserProfilePlaceholder> = {
  component: UserProfilePlaceholder,
}
const render = () => <UserProfilePlaceholder />
export const Default: Story = {render}

export default meta
