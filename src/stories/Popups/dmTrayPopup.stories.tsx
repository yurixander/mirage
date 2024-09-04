import {type Meta, type StoryObj} from "@storybook/react"
import DMTrayPopup, {
  type DMUser,
  type DMTrayPopupProps,
  type DMRoomData,
} from "@/containers/NavigationSection/DMTrayPopup"
import React from "react"

type Story = StoryObj<typeof DMTrayPopup>

const meta: Meta<typeof DMTrayPopup> = {
  component: DMTrayPopup,
}
const render = (args: DMTrayPopupProps): React.JSX.Element => (
  <DMTrayPopup {...args} />
)

const searchResult: DMUser[] = [
  {displayName: "Emerald Branch", userId: "@emerald_branch:matrix.org"},
  {displayName: "Erik 31", userId: "@erik31:matrix.org"},
]

const currentUserId = "@thecriss:matrix.org"
const dmClickErrorMsg = "`DMRoomClick` function has not been implemented"

const resultUserClickErrorMsg =
  "`resultUserClick` function has not been implemented"

const dmRooms: DMRoomData[] = [
  {
    partnerName: "Josef Pineapple",
    partnerId: "@josef43:matrix.org",
    roomId: "roomId_for_test",
  },
]

export const Default: Story = {
  render,
  args: {
    dmRooms,
    userId: currentUserId,
    searchResult: null,
    isLoading: false,
    setQuery(query) {},
    clearResult() {},
    onResultUserClick(userId) {
      throw new Error(resultUserClickErrorMsg)
    },
    dmRoomClick(roomId) {
      throw new Error(dmClickErrorMsg)
    },
  },
}

export const LoadingState: Story = {
  render,
  args: {
    dmRooms,
    userId: currentUserId,
    searchResult: null,
    isLoading: true,
    setQuery(query) {},
    clearResult() {},
    onResultUserClick(userId) {
      throw new Error(resultUserClickErrorMsg)
    },
    dmRoomClick(roomId) {
      throw new Error(dmClickErrorMsg)
    },
  },
}

export const ResultsState: Story = {
  render,
  args: {
    dmRooms,
    searchResult,
    userId: currentUserId,
    isLoading: false,
    setQuery(query) {},
    clearResult() {},
    onResultUserClick(userId) {
      throw new Error(resultUserClickErrorMsg)
    },
    dmRoomClick(roomId) {
      throw new Error(dmClickErrorMsg)
    },
  },
}

export default meta