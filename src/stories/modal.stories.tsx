import {Meta, StoryObj} from "@storybook/react"
import Modal, {ModalPosition, ModalProps} from "../components/Modal"
import UserCard from "../components/UserCard"
import {UserStatus} from "../components/UserProfile"

type Story = StoryObj<typeof Modal>

const meta: Meta<typeof Modal> = {component: Modal}
const render = (args: ModalProps) => <Modal {...args} />

export const Default: Story = {
  render,
  args: {
    position: ModalPosition.Default,
    onClose: () => { },
    isOpen: () => { },
    children: <UserCard userProfileProps={{
      avatarUrl: undefined,
      text: "@emerald_branch",
      displayName: "Emerald Branch",
      displayNameColor: "#5CC679",
      status: UserStatus.Online
    }} aboutMe={""}
      accountCreationTime={0}
      serverJoinTime={0}
      lastMessageTime={0} />
  }
}

export default meta
