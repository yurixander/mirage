import {Meta, StoryObj} from "@storybook/react"
import Roster, {Category, RosterProps} from "../components/Roster"
import {UserStatus} from "../components/UserProfile"

type Story = StoryObj<typeof Roster>

const meta: Meta<typeof Roster> = {component: Roster}
const render = (args: RosterProps) => <Roster {...args} />

export const Default: Story = {
  render,
  args: {
    users: [
      {
        category: Category.Member,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.Idle,
          isLarge: false
        }
      },
      {
        category: Category.Member,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.Online,
          isLarge: false
        }
      },
      {
        category: Category.Member,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.Idle,
          isLarge: false
        }
      },
      {
        category: Category.Admin,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.Online,
          isLarge: false
        }
      },
      {
        category: Category.Member,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.Idle,
          isLarge: false
        }
      },
      {
        category: Category.Member,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.Idle,
          isLarge: false
        }
      }
    ]
  }
}

export default meta
