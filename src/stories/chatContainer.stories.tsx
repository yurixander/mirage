import {type Meta, type StoryObj} from "@storybook/react"
import ChatContainer, {
  type ChatContainerProps,
} from "../components/ChatContainer"
import {RoomType} from "../components/Room"
import UnreadIndicator from "../components/UnreadIndicator"
import EventMessage from "../components/EventMessage"
import ImageMessage from "../components/ImageMessage"
import TextMessage from "../components/TextMessage"

type Story = StoryObj<typeof ChatContainer>

const meta: Meta<typeof ChatContainer> = {component: ChatContainer}
const render = (args: ChatContainerProps) => <ChatContainer {...args} />
const userDisplayNameColor = "#5CC679"

// const messageIds = Array.from({length: 5}, () => useUniqueNumber())

// TODO: Check useUniqueNumber duplicates and select useUniqueNumber or Math.random

export const Default: Story = {
  render,
  args: {
    name: "Help & guides",
    text: "— Request assistance from your colleagues.",
    type: RoomType.TEXT,
    chatComponents: [
      <TextMessage
        key={0}
        id={Math.random()}
        authorDisplayName="John Doe"
        authorDisplayNameColor="rgb(100, 200, 100)"
        authorAvatarUrl={
          "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        text={
          "The database hiccup turned into a full-on dance. We need to streamline our queries and possibly rethink our indexing strategy. Anyone up for a deep dive into our SQL?"
        }
        timestamp={Date.now()}
        onAuthorClick={() => {}}
      />,
      <UnreadIndicator key={1} />,
      <TextMessage
        key={2}
        id={Math.random()}
        authorDisplayName="John Doe"
        authorDisplayNameColor="rgb(100, 200, 100)"
        authorAvatarUrl="https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        text="The database hiccup turned into a full-on dance. We need to streamline our queries and possibly rethink our indexing strategy. Anyone up for a deep dive into our SQL?"
        timestamp={Date.now()}
        onAuthorClick={() => {}}
      />,
      <ImageMessage
        key={3}
        id={Math.random()}
        imageUrl="https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        authorDisplayName="John Doe"
        authorDisplayNameColor="rgb(100, 200, 100)"
        authorAvatarUrl="https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        text="This image is amazing!"
        timestamp={Date.now()}
        onAuthorClick={() => {}}
      />,
      <TextMessage
        key={4}
        id={Math.random()}
        authorDisplayName="John Doe"
        authorDisplayNameColor="rgb(100, 200, 100)"
        authorAvatarUrl="https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        text="The database hiccup turned into a full-on dance. We need to streamline our queries and possibly rethink our indexing strategy. Anyone up for a deep dive into our SQL?"
        timestamp={Date.now()}
        onAuthorClick={() => {}}
      />,
      <EventMessage
        key={5}
        content={
          <span>
            <strong style={{color: userDisplayNameColor}}>
              Sapphire Pineapple
            </strong>{" "}
            changed their name to{" "}
            <strong style={{color: userDisplayNameColor}}>Snappy Turtle</strong>
            .
          </span>
        }
        timestamp={Date.now()}
      />,
    ],
  },
}

export default meta
