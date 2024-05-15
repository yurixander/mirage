import MemberList from "@/containers/Roster/MemberList"
import {UserPowerLevel} from "@/containers/Roster/RosterUser"
import {type Meta, type StoryObj} from "@storybook/react"

type Story = StoryObj<typeof MemberList>

const meta: Meta<typeof MemberList> = {
  component: MemberList,
}
const render = () => (
  <MemberList
    list={[
      {
        title: "Admins",
        users: [
          {
            displayName: "Emerald Branch",
            lastPresenceAge: Date.now(),
            onClick: () => {},
            powerLevel: UserPowerLevel.Admin,
            userId: "@emerald_branch",
          },
          {
            displayName: "Albert Ericson",
            lastPresenceAge: Date.now(),
            onClick: () => {},
            powerLevel: UserPowerLevel.Admin,
            userId: "@albert43",
          },
          {
            displayName: "Arthur",
            lastPresenceAge: Date.now(),
            onClick: () => {},
            powerLevel: UserPowerLevel.Admin,
            userId: "@arthur32",
          },
        ],
      },
      {
        title: "Moderators",
        users: [
          {
            displayName: "Eric",
            lastPresenceAge: Date.now(),
            onClick: () => {},
            powerLevel: UserPowerLevel.Admin,
            userId: "@eric39",
          },
        ],
      },
      {
        title: "Members",
        users: [
          {
            displayName: "Robin",
            lastPresenceAge: Date.now(),
            onClick: () => {},
            powerLevel: UserPowerLevel.Admin,
            userId: "@robin45",
          },
          {
            displayName: "Alexander",
            lastPresenceAge: Date.now(),
            onClick: () => {},
            powerLevel: UserPowerLevel.Admin,
            userId: "@alexander21",
          },
        ],
      },
    ]}
  />
)

export const Default: Story = {
  render,
  args: {},
}

export default meta
