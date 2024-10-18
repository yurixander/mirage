import type {Meta, StoryObj} from "@storybook/react"
import DMTrayPopup, {
  type DMUser,
  type DMTrayPopupProps,
  type DMRoomData,
} from "@/containers/NavigationSection/DMTrayPopup"
import type React from "react"
import {Button} from "@/components/ui/button"
import {IoPaperPlane} from "react-icons/io5"

type Story = StoryObj<typeof DMTrayPopup>

const meta: Meta<typeof DMTrayPopup> = {
  component: DMTrayPopup,
}
const render = (args: DMTrayPopupProps): React.JSX.Element => (
  <DMTrayPopup {...args}>
    <Button aria-label="View Direct chats" size="icon" variant="ghost">
      <IoPaperPlane size={20} />
    </Button>
  </DMTrayPopup>
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
    setQuery(_query) {},
    clearResult() {},
    onResultUserClick(_userId) {
      throw new Error(resultUserClickErrorMsg)
    },
    dmRoomClick(_roomId) {
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
    setQuery(_query) {},
    clearResult() {},
    onResultUserClick(_userId) {
      throw new Error(resultUserClickErrorMsg)
    },
    dmRoomClick(_roomId) {
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
    setQuery(_query) {},
    clearResult() {},
    onResultUserClick(_userId) {
      throw new Error(resultUserClickErrorMsg)
    },
    dmRoomClick(_roomId) {
      throw new Error(dmClickErrorMsg)
    },
  },
}

export default meta
