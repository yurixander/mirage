import {type Meta, type StoryObj} from "@storybook/react"
import UserProfile, {type UserProfileProps} from "../components/UserProfile"
import {IoHeadsetSharp} from "react-icons/io5"
import Typography, {TypographyVariant} from "@/components/Typography"

type Story = StoryObj<typeof UserProfile>

const meta: Meta<typeof UserProfile> = {component: UserProfile}
const render = (arguments_: UserProfileProps) => <UserProfile {...arguments_} />

const displayName = "Emerald Branch"
const username = "@emerald_branch"

export const Default: Story = {
  render,
  args: {
    displayName,
    displayNameColor: "#5CC679",
    children: (
      <Typography variant={TypographyVariant.BodySmall}>{username}</Typography>
    ),
    isLarge: false,
  },
}

export const WithActivityIcon: Story = {
  render,
  args: {
    displayName,
    displayNameColor: "#5CC679",
    isLarge: false,
    children: (
      <Typography
        className="flex items-center gap-1"
        variant={TypographyVariant.BodySmall}>
        Listening to <b>Spotify</b> <IoHeadsetSharp size={12} />
      </Typography>
    ),
  },
}

export const Large: Story = {
  render,
  args: {
    displayName,
    displayNameColor: "#5CC679",
    children: (
      <Typography variant={TypographyVariant.BodyMedium}>
        Last presence age 4:00pm
      </Typography>
    ),
    isLarge: true,
  },
}

export default meta
