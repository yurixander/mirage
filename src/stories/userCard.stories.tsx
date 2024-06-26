import {type Meta, type StoryObj} from "@storybook/react"
import UserCard, {
  type UserCardProps as UserCardProperties,
} from "../components/UserCard"
import Typography from "@/components/Typography"

type Story = StoryObj<typeof UserCard>

const date = new Date().getDate()
const meta: Meta<typeof UserCard> = {component: UserCard}
const render = (arguments_: UserCardProperties) => <UserCard {...arguments_} />

export const Default: Story = {
  render,
  args: {
    userProfileProps: {
      displayName: "Emerald Branch",
      displayNameColor: "#5CC679",
      children: <Typography>Online</Typography>,
      isLarge: true,
    },
    aboutMe:
      "👋 Hey there! I'm a natural born adventurer who loves exploring the intricacies of daily life. I sure hope we can be friends! 🥳",
    accountCreationTime: date,
    lastMessageTime: date,
    serverJoinTime: date,
  },
}

export default meta
