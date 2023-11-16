import {Meta, StoryObj} from "@storybook/react"
import Roster, {RosterUserCategory, RosterProps} from "../components/Roster"
import {UserStatus} from "../components/UserProfile"

type Story = StoryObj<typeof Roster>

const meta: Meta<typeof Roster> = {component: Roster}
const render = (args: RosterProps) => <Roster {...args} />

export const Default: Story = {
  render,
  args: {
    users: [
      {
        category: RosterUserCategory.Member,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.Idle
        }
      },
      {
        category: RosterUserCategory.Member,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.Online
        }
      },
      {
        category: RosterUserCategory.Member,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.Idle
        }
      },
      {
        category: RosterUserCategory.Admin,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.Online
        }
      },
      {
        category: RosterUserCategory.Member,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.Idle
        }
      },
      {
        category: RosterUserCategory.Member,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.Idle
        }
      }
    ]
  }
}

export default meta
