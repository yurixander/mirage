import "../styles/App.sass"
import {useLocation, useNavigate} from "react-router-dom"
import {Credentials, Path} from "../index"
// import * as sdk from "matrix-js-sdk";
// import { SyncState } from "matrix-js-sdk/lib/sync";
import React, {useEffect, useState} from "react"
import Messages from "../components/Messages"
import ChatControls from "../components/ChatControls"
import Loader from "../components/Loader"
import RoomsBar, {Room} from "../components/RoomsBar"
import Modal, {ModalProps} from "../components/Modal"
import {faWarning} from "@fortawesome/free-solid-svg-icons"

export type Message = {
  senderId?: string
  // sender?: sdk.RoomMember;
  // content: sdk.IContent;
  avatarUrl?: string
}

// let client: sdk.MatrixClient;

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const $messageInput = React.useRef<HTMLInputElement>(null)

  // React state.
  const [isInitializing, setIsInitializing] = useState(true)

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "test_a",
      name: "Test A",
      avatarUrl:
        "https://avatar.oxro.io/avatar.svg?name=TestA&caps=1&isRounded=true&length=1",
    },
    {
      id: "orange",
      name: "Orange",
      avatarUrl:
        "https://avatar.oxro.io/avatar.svg?name=Orange&caps=1&isRounded=true&length=1",
    },
    {
      id: "apple",
      name: "Apple",
      avatarUrl:
        "https://avatar.oxro.io/avatar.svg?name=Apple&caps=1&isRounded=true&length=1",
    },
  ])

  // const [messages, setMessages] = useState<Message[]>([]);
  // const [message, setMessage] = useState("");
  // const [activeRoomId, setActiveRoomId] = useState<string | null>("apple");
  // const [typing, setTyping] = useState<string[]>([]);
  // const [activeModal, setActiveModal] = useState<ModalProps | null>(null);
  // const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // if (location.state === null) return navigate(Path.Login);
    // const credentials = location.state as Credentials;
    // client = sdk.createClient(Object.assign({}, credentials));
    // const fatalError = (message: string) => {
    //   client.stopClient();
    //   window.alert(message);
    //   navigate(Path.Login);
    // };
    // // Setup event handlers.
    // client.once(sdk.ClientEvent.Sync, function (state, _, res) {
    //   if (state === SyncState.Error)
    //     return fatalError("Sync error: " + res?.error?.message);
    //   // Client is ready.
    //   else if (state === SyncState.Prepared) {
    //     const rooms = client.getRooms();
    //     rooms.length > 0 && setActiveRoomId(rooms[0].roomId);
    //     // setRooms(rooms);
    //     setIsInitializing(false);
    //   }
    // });
    // client.on(sdk.ClientEvent.SyncUnexpectedError, (_) => {
    //   // window.alert("Sync: Unexpected error!");
    // });
    // // client.on(sdk.ClientEvent.AccountData, (state) => {
    // //   window.alert("Account data: " + JSON.stringify(state));
    // // });
    // client.on(sdk.ClientEvent.Room, (room) => {
    //   console.log("Room event", room);
    // });
    // client.on(sdk.RoomEvent.Timeline, (event, room, _toStartOfTimeline) => {
    //   // Listen only for new messages.
    //   if (event.getType() !== sdk.EventType.RoomMessage) return;
    //   // Ignore messages not from the active room.
    //   else if (room.roomId !== activeRoomId) return console.log(activeRoomId);
    //   const senderId = event.getSender();
    //   const roomMember = room.getMember(senderId);
    //   setMessages((messages) => [
    //     {
    //       senderId,
    //       avatarUrl:
    //         roomMember?.getAvatarUrl(
    //           client.getHomeserverUrl(),
    //           50,
    //           50,
    //           "crop",
    //           true,
    //           false
    //         ) || undefined,
    //       sender: roomMember || undefined,
    //       content: event.getContent(),
    //     },
    //     ...messages,
    //   ]);
    // });
    // client.on(sdk.RoomMemberEvent.Typing, (_, member) => {
    //   // Ignore typing event for the user.
    //   if (member.userId === client.getUserId()) return;
    //   // Ignore messages not from the active room.
    //   else if (member.roomId !== activeRoomId) return;
    //   // TODO: Listen for when the user stops typing.
    //   // TODO: What about identical names?
    //   if (!typing.includes(member.name)) {
    //     setTyping((typing) => [...typing, member.name]);
    //     // TODO: Temporary.
    //     setTimeout(() => setTyping([]), 10000);
    //   }
    // });
    // client.on(sdk.ClientEvent.Event, (_) => {
    //   // console.log("Client event, event:", e);
    // });
    // client.on(sdk.RoomStateEvent.Members, (_event, state, member) => {
    //   const room = client.getRoom(state.roomId);
    //   if (room === null) return;
    //   addSystemMessage(`member ${member.membership}`, member.name);
    // });
    // client.startClient();
  })

  // React event handlers.
  const viewCredentials = () => {
    // console.log(credentials)
  }

  const logout = () => {
    // client.stopClient();
    // navigate(Path.Login);
  }

  const sendMessage = () => {
    // if (activeRoomId === null) return window.alert("Active room is null.");
    // const trimmedMessage = message.trim();
    // if (trimmedMessage.length === 0) return;
    // client.sendEvent(
    //   activeRoomId,
    //   sdk.EventType.RoomMessage,
    //   {
    //     body: trimmedMessage,
    //     msgtype: sdk.MsgType.Text,
    //   },
    //   ""
    // );
    // setMessage("");
    // $messageInput.current?.focus();
  }

  const addSystemMessage = (subject: string, message: string) => {
    // setMessages((messages) => [
    //   {
    //     content: {
    //       body: `${subject}: ${message}`,
    //     },
    //   },
    //   ...messages,
    // ]);
  }

  const handleRoomChange = (room: Room) => {
    // if (room.id === activeRoomId) return;
    // addSystemMessage("switched to room", room.name);
    // setActiveRoomId(room.id);
  }

  return (
    <div className="App">
      {/* {activeModal && (
        <Modal
          text={activeModal.text}
          acceptText={activeModal.acceptText}
          onAccept={() => setActiveModal(null)}
        />
      )} */}
      {/* <Notifications notifications={notifications} /> */}
      {
        /* {isInitializing
      ? <div className="init">
        <div className="status">Initializing client. This may take a while.</div>
        <Loader />
        <div onClick={logout} className="text-link">Cancel &bull; Go back to sign in</div>
      </div>
      :*/ <div className="app">
          {/* <RoomsBar
            avatarBaseUrl={"/"}
            activeRoomId={activeRoomId}
            rooms={rooms}
            onRoomClick={handleRoomChange}
            onDeveloperToolsClick={() => {
              setNotifications((notifications) => [
                ...notifications,
                {
                  icon: faWarning,
                  title: "New notification",
                  text: "This is a notification toast!",
                },
              ]);
            }}
          /> */}
          <div className="chat">
            {/* <ChatMessages messages={messages} />
            <ChatControls
              placeholder="Type a message..."
              sendButtonText="Send message"
              value={message}
              setValue={setMessage}
              sendMessage={sendMessage}
            />
            <div data-hidden={typing.length === 0} className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              {typing.length > 5
                ? `${typing.length} people are typing...`
                : typing.length > 0
                ? typing.join(", ") +
                  (typing.length > 1 ? " are" : " is") +
                  " typing..."
                : "No one is typing."}
            </div> */}
          </div>
        </div>
      }
    </div>
  )
}
