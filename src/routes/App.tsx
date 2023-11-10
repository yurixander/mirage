import "../styles/App.sass"
import {useLocation, useNavigate} from "react-router-dom"
// import * as sdk from "matrix-js-sdk";
// import { SyncState } from "matrix-js-sdk/lib/sync";
import React, {useEffect, useState} from "react"

export type Message = {
  senderId?: string
  // sender?: sdk.RoomMember;
  // content: sdk.IContent;
  avatarUrl?: string
}

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()

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

  return (
    <div className="App">
      <div className="app">
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
    </div>
  )
}
