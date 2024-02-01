import {type Meta, type StoryObj} from "@storybook/react"
import Roster, {
  RosterUserCategory,
  type RosterProps,
} from "../components/Roster"
import {UserStatus} from "../components/UserProfile"

type Story = StoryObj<typeof Roster>

const meta: Meta<typeof Roster> = {component: Roster}
const render = (args: RosterProps) => <Roster {...args} />

export const Default: Story = {
  render,
  args: {
    users: [
      {
        category: RosterUserCategory.MEMBER,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.IDLE,
          isLarge: false,
        },
      },
      {
        category: RosterUserCategory.MEMBER,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.ONLINE,
          isLarge: false,
        },
      },
      {
        category: RosterUserCategory.MEMBER,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.IDLE,
          isLarge: false,
        },
      },
      {
        category: RosterUserCategory.ADMIN,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.ONLINE,
          isLarge: false,
        },
      },
      {
        category: RosterUserCategory.MEMBER,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.IDLE,
          isLarge: false,
        },
      },
      {
        category: RosterUserCategory.MEMBER,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.IDLE,
          isLarge: false,
        },
      },
      {
        category: RosterUserCategory.MEMBER,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.IDLE,
          isLarge: false,
        },
      },
      {
        category: RosterUserCategory.MEMBER,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.IDLE,
          isLarge: false,
        },
      },
      {
        category: RosterUserCategory.ADMIN,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.ONLINE,
          isLarge: false,
        },
      },
      {
        category: RosterUserCategory.MEMBER,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.IDLE,
          isLarge: false,
        },
      },
      {
        category: RosterUserCategory.MEMBER,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.IDLE,
          isLarge: false,
        },
      },
      {
        category: RosterUserCategory.MEMBER,
        userProfileProps: {
          displayName: "Emerald Branch",
          displayNameColor: "#5CC679",
          text: "@emerald_branch",
          status: UserStatus.IDLE,
          isLarge: false,
        },
      },
    ],
  },
}

export default meta
