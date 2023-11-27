import {Meta, StoryObj} from "@storybook/react"
import ChatContainer, {ChatContainerProps} from "../components/ChatContainer"
import {RoomType} from "../components/Room"
import Message from "../components/Message"
import UnreadIndicator from "../components/UnreadIndicator"
import EventMessage from "../components/EventMessage"

type Story = StoryObj<typeof ChatContainer>

const meta: Meta<typeof ChatContainer> = {component: ChatContainer}
const render = (args: ChatContainerProps) => <ChatContainer {...args} />
const userDisplayNameColor = "#5CC679"

export const Default: Story = {
  render,
  args: {
    name: "Help & guides",
    text: "— Request assistance from your colleagues.",
    type: RoomType.Text,
    chatComponents: [
      <Message
        authorDisplayName={"John Doe"}
        authorDisplayNameColor={"rgb(100, 200, 100)"}
        authorAvatarUrl={"https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"} text={"The database hiccup turned into a full-on dance. We need to streamline our queries and possibly rethink our indexing strategy. Anyone up for a deep dive into our SQL?"}
        timestamp={Date.now()}
        onAuthorClick={() => { }} />,
      <UnreadIndicator />,
      <Message
        authorDisplayName={"John Doe"}
        authorDisplayNameColor={"rgb(100, 200, 100)"}
        authorAvatarUrl={"https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"} text={"The database hiccup turned into a full-on dance. We need to streamline our queries and possibly rethink our indexing strategy. Anyone up for a deep dive into our SQL?"}
        timestamp={Date.now()}
        onAuthorClick={() => { }} />,
      <Message
        authorDisplayName={"John Doe"}
        authorDisplayNameColor={"rgb(100, 200, 100)"}
        authorAvatarUrl={"https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"} text={"The database hiccup turned into a full-on dance. We need to streamline our queries and possibly rethink our indexing strategy. Anyone up for a deep dive into our SQL?"}
        timestamp={Date.now()}
        onAuthorClick={() => { }} />,
      <EventMessage content={<span>
        <strong style={{color: userDisplayNameColor}}>Sapphire Pineapple</strong> changed their name to <strong style={{color: userDisplayNameColor}}>Snappy Turtle</strong>.
      </span>} timestamp={Date.now()} />
    ]
  }
}

export default meta
