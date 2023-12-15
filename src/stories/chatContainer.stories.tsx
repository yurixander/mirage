import {Meta, StoryObj} from "@storybook/react"
import ChatContainer, {ChatContainerProps} from "../components/ChatContainer"
import {RoomType} from "../components/Room"
import UnreadIndicator from "../components/UnreadIndicator"
import EventMessage from "../components/EventMessage"
import ImageMessage from "../components/ImageMessage"
import TextMessage from "../components/TextMessage"
import useUniqueNumber from "../hooks/useUniqueNumber"

type Story = StoryObj<typeof ChatContainer>

const meta: Meta<typeof ChatContainer> = {component: ChatContainer}
const render = (args: ChatContainerProps) => <ChatContainer {...args} />
const userDisplayNameColor = "#5CC679"

//const messageIds = Array.from({length: 5}, () => useUniqueNumber())

// TODO: Check useUniqueNumber duplicates and select useUniqueNumber or Math.random

export const Default: Story = {
  render,
  args: {
    name: "Help & guides",
    text: "— Request assistance from your colleagues.",
    type: RoomType.Text,
    chatComponents: [
      <TextMessage
        id={Math.random()}
        authorDisplayName={"John Doe"}
        authorDisplayNameColor={"rgb(100, 200, 100)"}
        authorAvatarUrl={"https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"}
        text={"The database hiccup turned into a full-on dance. We need to streamline our queries and possibly rethink our indexing strategy. Anyone up for a deep dive into our SQL?"}
        timestamp={Date.now()}
        onAuthorClick={() => { }} />,
      <UnreadIndicator />,
      <TextMessage
        id={Math.random()}
        authorDisplayName={"John Doe"}
        authorDisplayNameColor={"rgb(100, 200, 100)"}
        authorAvatarUrl={"https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"} text={"The database hiccup turned into a full-on dance. We need to streamline our queries and possibly rethink our indexing strategy. Anyone up for a deep dive into our SQL?"}
        timestamp={Date.now()}
        onAuthorClick={() => { }} />,
      <ImageMessage
        id={Math.random()}
        imageUrl={"https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"}
        authorDisplayName={"John Doe"}
        authorDisplayNameColor={"rgb(100, 200, 100)"}
        authorAvatarUrl={"https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"} text={"This image is amazing!"}
        timestamp={Date.now()}
        onAuthorClick={() => { }} />,
      <TextMessage
        id={Math.random()}
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
