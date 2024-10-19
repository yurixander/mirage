import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import UserProfilePlaceholder from "../components/UserProfilePlaceholder"

type Story = StoryObj<typeof UserProfilePlaceholder>

const meta: Meta<typeof UserProfilePlaceholder> = {
  component: UserProfilePlaceholder,
}
const render = (): React.JSX.Element => <UserProfilePlaceholder />
export const Default: Story = {render}

export default meta
