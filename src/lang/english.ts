import {type LangDefinition} from "@/utils/lang"
import {LangKey} from "./allKeys"

export const english: LangDefinition = {
  [LangKey.MoreActions]: "More actions",
  [LangKey.CloseRoom]: "Close room",
  [LangKey.MoreErrorInformation]: "More error information",
  [LangKey.HelpInfoError]: "Info about error",
  [LangKey.CreateRoom]: "Create Room",
  [LangKey.CreateRoomModalSubtitle]:
    "Crea una sala para comunicarte con varias personas.",
  [LangKey.Name]: "Name",
  [LangKey.DescriptionOptional]: "Description (optional)",
  [LangKey.RoomDescriptionPlaceholder]:
    "A brief description about the purpose of this room",
  [LangKey.RoomPrivacy]: "Room Privacy",
  [LangKey.RoomAddress]: "Room Address",
  [LangKey.CreateRoomInvitedTextAssistance]:
    "Only those who are invited will be able to find and join this room. You can change this at any time from the room settings",
  [LangKey.CreateRoomEncryptionEnableTextAssistance]:
    "You won't be able to turn it off later. Bridges and most of robots still won't work.",
  [LangKey.TurnOnEndToEndEncryption]: "Turn on end-to-end encryption",
  [LangKey.NewSpace]: "New Space",
  [LangKey.CreateSpace]: "Create Space",
  [LangKey.CreateSpaceSpecInfo]:
    "Spaces are a new way of grouping rooms and people.",
  [LangKey.SpaceName]: "Space Name",
  [LangKey.SpaceDescriptionPlaceholder]:
    "Write a brief description of what your space will be about.",
  [LangKey.PublicRoom]: "Public Room",
  [LangKey.PrivateRoom]: "Private Room",
  [LangKey.Accept]: "Accept",
  [LangKey.Cancel]: "Cancel",
  [LangKey.NeedHelp]: "Need help?",
  [LangKey.UploadAudio]: "Upload Audio",
  [LangKey.Send]: "Send",
  [LangKey.LoadError]: "Load error",
  [LangKey.UserAvatar]: "User avatar",
  [LangKey.CallInProgress]: "Call in Progress",
  [LangKey.IncomingCall]: "Incoming Call",
  [LangKey.Connecting]: "Connecting",
  [LangKey.ExpandAll]: "Expand all",
  [LangKey.UploadFile]: "Upload File",
  [LangKey.ImageUploadedError]:
    "The image uploaded by the user is currently unavailable.",
  [LangKey.MessageBy]: "Message by",
  [LangKey.Preview]: "Preview",
  [LangKey.ImgMessageZoom]: "Img message zoom",
  [LangKey.MustBeAValidURL]: "Must be a valid URL.",
  [LangKey.MustNotBeEmpty]: "Must not be empty.",
  [LangKey.MustBeAValidUserID]: "Must be a valid user ID.",
  [LangKey.MustBeAnInteger]: "Must be an integer.",
  [LangKey.Error]: "Error",
  [LangKey.QuickMenu]: "Quick menu",
  [LangKey.Accessibility]: "Accessibility",
  [LangKey.SwitchTheme]: "Switch theme",
  [LangKey.Waiting]: "Waiting",
  [LangKey.SyncError]: "Sync error",
  [LangKey.Ready]: "Ready",
  [LangKey.Disconnected]: "Disconnected",
  [LangKey.Syncing]: "Syncing",
  [LangKey.CatchingUp]: "Catching up",
  [LangKey.Reconnecting]: "Reconnecting",
  [LangKey.AboutMe]: "About me",
  [LangKey.Account]: "Account",
  [LangKey.Created]: "Created",
  [LangKey.JoinedServer]: "Joined server",
  [LangKey.LastMessageSentWas]: "Last message sent was",
  [LangKey.ViewMessages]: "View messages ⟶",
  [LangKey.UploadVideo]: "Upload Video",
  [LangKey.PleaseRefresh]: "Please refresh",
  [LangKey.ClientError]: "Client error",
  [LangKey.Reject]: "Reject",
  [LangKey.ConnectionError]: "Connection Error",
  [LangKey.GoToLogin]: "Go to login",
  [LangKey.ConnectionErrorSubtitle]:
    "Connection lost with the server; please reload the page or login again.",
  [LangKey.Reply]: "Reply",
  [LangKey.Resend]: "Resend",
  [LangKey.Save]: "Save",
  [LangKey.Delete]: "Delete",
  [LangKey.Settings]: "Settings",
  [LangKey.Reload]: "Reload",
  [LangKey.Add]: "Add",
  [LangKey.Search]: "Search",
  [LangKey.CreateRoomLowercase]: "Create room",
  [LangKey.SearchRooms]: "Search rooms",
  [LangKey.SearchSpaces]: "Search spaces",
  [LangKey.AddToSpace]: "Add to space",
  [LangKey.CreateDM]: "Create DM",
  [LangKey.Refresh]: "Refresh",
  [LangKey.ViewMember]: "View member",
  [LangKey.FindUser]: "Find user",
  [LangKey.EqualInfo]: "carried out several events",
  [LangKey.PersonalInfo]: "changed his personal info.",
  [LangKey.ConfigureRoom]: "created and configured this room.",
  [LangKey.UploadImage]: "Upload Image",
  [LangKey.Close]: "Close",
  [LangKey.CloseModal]: "Close modal",
  [LangKey.TogglePlayPause]: "Toggle play pause",
  [LangKey.Pause]: "Pause",
  [LangKey.Play]: "Play",
  [LangKey.AcceptCall]: "Accept call",
  [LangKey.ToggleSpeaker]: "Toggle speaker",
  [LangKey.ToggleMicrophone]: "Toggle microphone",
  [LangKey.CallOf]: "Call off",
  [LangKey.ClickToDownload]: "Click to download",
  [LangKey.Call]: "Call",
  [LangKey.VideoCall]: "Video call",
  [LangKey.CopyLink]: "Copy link",
  [LangKey.SearchInRoom]: "Search in room",
  [LangKey.RoomDetails]: "Room details",
  [LangKey.ExpandRoster]: "Expand roster",
  [LangKey.DownloadImage]: "Download image",
  [LangKey.SyncState]: "Sync state",
  [LangKey.JumpToDown]: "Jump to down",
  [LangKey.UnreadMessagesCount]: (count: string) => `${count} Unread messages`,
  [LangKey.SpaceCreatedSuccess]: "Space created successfully",
  [LangKey.RoomCreatedSuccess]: "Room created successfully",
  [LangKey.Contacts]: "Contacts",

  // #region Roster
  [LangKey.People]: "People",
  [LangKey.SortMembers]: "Sort members",
  [LangKey.MembersError]: "Members Error",
  [LangKey.ReloadMembers]: "Reload members",
  [LangKey.ReloadMessages]: "Reload messages",
  [LangKey.Admins]: "Admins",
  [LangKey.Moderators]: "Moderators",
  [LangKey.Members]: "Members",
  [LangKey.SeenLongAgo]: "Seen long ago",
  [LangKey.LastSeenDate]: (date: string) => `Seen ${date} ago`,
  [LangKey.OpenUserError]: (message: string) =>
    `Failed to open user by: ${message}`,

  // #region Events
  [LangKey.DeletedMessage]: (user: string) => `${user} deleted this message`,
  [LangKey.DeletedMessageBecause]: (user: string, reason: string) =>
    `${user} deleted this message because of "${reason}"`,
  [LangKey.RoomNameChange]: "set the name of the room",
  [LangKey.RoomNameChangeTo]: (roomName: string) =>
    `set the name of the room to ${roomName}`,
  [LangKey.RemoveAvatar]: "removed the avatar from this room",
  [LangKey.ChangeAvatar]: "set the avatar of the room",
  [LangKey.RemoveMainAddress]: "removed the main address from this room",
  [LangKey.SetMainAddressAs]: (alias: string) =>
    `set the main address from this room as ${alias}`,
  [LangKey.HistoryVisibilityShared]:
    "made the future history of the room visible to all members of the room.",
  [LangKey.HistoryVisibilityInvited]:
    "made the room future history visible to all room members, from the moment they are invited.",
  [LangKey.HistoryVisibilityJoined]:
    "made the room future history visible to all room members, from the moment they are joined.",
  [LangKey.HistoryVisibilityWorldReadable]:
    "made the future history of the room visible to anyone.",
  [LangKey.RemoveTopic]: "removed the topic of the room",
  [LangKey.ChangeTopicTo]: (topic: string) => `set the topic to ${topic}`,
  [LangKey.JoinRuleInvite]: "restricted the room to guests",
  [LangKey.JoinRulePublic]: "made the room public to anyone who knows the link",
  [LangKey.JoinRuleRestricted]:
    "made the room private. Only admins can invite now",
  [LangKey.GuessAccessCanJoin]: "authorized anyone to join the room",
  [LangKey.GuessAccessForbidden]: "prohibited guests from joining the room",
  [LangKey.GuessAccessRestricted]:
    "restricted guest access to the room. Only guests with valid tokens can join.",
  [LangKey.GuessAccessKnock]:
    "enabled `knocking` for guests. Guests must request access to join.",
  [LangKey.CanceledInvitation]: (user: string) =>
    `canceled the invitation to ${user}`,
  [LangKey.MembershipBanFrom]: (user: string) => `removed the ban from ${user}`,
  [LangKey.MembershipJoin]: "left the room",
  [LangKey.JoinedToTheRoom]: "joined the room",
  [LangKey.ChangeName]: "changed the name",
  [LangKey.ChangeNameTo]: (user: string) => `set the name to ${user}`,
  [LangKey.PutProfilePhoto]: "set profile photo",
  [LangKey.ChangeProfilePhoto]: "set profile photo",
  [LangKey.RemoveProfilePhoto]: "removed the profile photo",
  [LangKey.Invited]: (user: string) => `invited ${user}`,
  [LangKey.Banned]: (user: string) => `banned ${user}`,
  [LangKey.BannedByReason]: (user: string, reason: string) =>
    `banned ${user} for: ${reason}`,
  [LangKey.ExpandEvents]: "Expand events",
  [LangKey.CollapseEvents]: "Collapse events",
  [LangKey.EventBodyWithTime]: (body: string, time: string) =>
    `${body} at ${time}`,

  // #region Login
  [LangKey.DecorativeBackgroundAlt]: "Abstract background for login page",
  [LangKey.WelcomeBack]: "Welcome Back",
  [LangKey.LoginSubtitleInfo]:
    "Already have an account? Please enter your email and password to sign in.",
  [LangKey.UserID]: "User ID",
  [LangKey.Password]: "Password",
  [LangKey.HideToken]: "Hide token",
  [LangKey.ShowToken]: "Show token",
  [LangKey.SignIn]: "Sign in →",
  [LangKey.ForgotPassword]: "Forgot password?",
  [LangKey.NoAccountText]: "Don’t have an account?",
  [LangKey.SignUp]: "Sign up",

  // #region Navigation
  [LangKey.Rooms]: "Rooms",
  [LangKey.DirectChats]: "Direct chats",
  [LangKey.Recommended]: "Recommended",
  [LangKey.GoToHome]: "Go to home",
  [LangKey.RoomsLoadingError]: "Rooms loading error",
  [LangKey.ViewDirectChats]: "View Direct chats",
  [LangKey.ViewNotifications]: "View notifications",
  [LangKey.SearchAnything]: "Search anything",
  [LangKey.Calls]: "Calls",
  [LangKey.ExitApp]: "Exit app",
  [LangKey.LoadingDMs]: "Loading DMs",
  [LangKey.DirectRooms]: "Direct Rooms",
  [LangKey.DMTrayFindUserDescription]:
    "Start a conversation with someone using their name or username (@username:mirage.org).",
  [LangKey.EnterNameOrUsername]: "Enter name or username",
  [LangKey.RoomsEmptyTitle]: "No rooms yet",
  [LangKey.RoomsEmptySubtitle]: "You can search for users and start a chat",
  [LangKey.RecentConversations]: "RECENT CONVERSATIONS",
  [LangKey.DMTrayFoundedDescription]:
    "Some suggestions may not be shown for privacy reasons. If you don’t find who you’re looking for, send them your invitation link below.",
  [LangKey.UserInvalid]: "User invalid",
  [LangKey.InvitationLinkIncorrect]: "The invitation link is not correct.",
  [LangKey.LinkCopiedSuccessfully]: "Link copied successfully",
  [LangKey.CopyLinkError]: "Could not copy link by reason",
  [LangKey.OpenChatError]: "Failed to open chat room by reason",
  [LangKey.DMChatWith]: "DMChat with",
  [LangKey.RoomOwners]: "Room owners",
  [LangKey.LogOut]: "Log out",
  [LangKey.LogOutDescription]:
    "You are about to log out, once logged out you will be redirected to the login page, do ypu want to continue?",

  // #region Notifications
  [LangKey.Notifications]: "Notifications",
  [LangKey.LoadingNotifications]: "Loading Notifications",
  [LangKey.NotificationsEmpty]: "There are no notifications",
  [LangKey.GoTo]: "Go to ⟶",
  [LangKey.RemoveNotification]: "Remove notification",
  [LangKey.MarkAsRead]: "Mark as read",
  [LangKey.NotificationTypeInvited]: "Has invited you to",
  [LangKey.NotificationTypeInvitationRemoved]:
    "The invitation to join has been withdrawn to",
  [LangKey.NotificationTypeDowngradeToMember]:
    "You have been demoted to member in",
  [LangKey.NotificationTypeUpgradeToAdmin]:
    "You have been promoted to admin in",
  [LangKey.NotificationTypeUpgradeToModerator]:
    "You have been promoted to moderator in",

  // #region RoomContainer
  [LangKey.AttachSource]: "Attach source",
  [LangKey.AttachFile]: "Attach file",
  [LangKey.File]: "File",
  [LangKey.Image]: "Image",
  [LangKey.AttachImage]: "Attach image",
  [LangKey.AttachVideo]: "Attach video",
  [LangKey.Video]: "Video",
  [LangKey.Audio]: "Audio",
  [LangKey.AttachAudio]: "Attach audio",
  [LangKey.LoadingRoom]: "Loading room",
  [LangKey.ChatInputPlaceholder]: "Write a message or simply say 👋🏼 hello...",
  [LangKey.RecordAudio]: "Record Audio",
  [LangKey.SendTextMessage]: "Send text message",
  [LangKey.EmojiPicker]: "Emoji picker",
  [LangKey.EmojiIcon]: "Emoji icon",
  [LangKey.SearchAnyEmoji]: "Search emoji...",
  [LangKey.MoreVariants]: "More variants",
  [LangKey.AllSpaces]: "All spaces",
  [LangKey.MessagesError]: "Messages Error",
  [LangKey.MessagesErrorSubtitle]:
    "An error occurred when obtaining messages from this room.",
  [LangKey.NoMessages]: "No Messages",
  [LangKey.NoMessagesSubtitle]: "Is this room new or has no messages.",
  [LangKey.LoadingImageError]: "An error occurred while loading the image",
  [LangKey.YouHaveBeenInvitedToThisRoom]: "You have been invited to this room",
  [LangKey.RejectInvitationError]:
    "An error occurred while trying to reject the invitation.",
  [LangKey.JoiningRoomError]:
    "An error occurred while trying to join the Room.",
  [LangKey.RoomNotFound]: "Room Not Found",
  [LangKey.RoomNotFoundDescription]:
    "You don't have access to this room or it doesn't exist.",
  [LangKey.SeveralPeople]: "Several people",
  [LangKey.And]: " and ",
  [LangKey.Typing]: "typing...",
  [LangKey.Are]: "are",
  [LangKey.Is]: "is",
  [LangKey.RoomEncrypted]: "This room is encrypted using End-to-end encryption",
  [LangKey.Topic]: "Topic",
  [LangKey.JoinRoom]: "Join room",
  [LangKey.CreateConversation]: "Create conversation",
  [LangKey.TaskCompleted]: "Task completed",
  [LangKey.JoinRoomCompleted]: "You have successfully joined the room",
  [LangKey.RoomInvitedError]: "Room Invited Error",
  [LangKey.DefaultJoinRoomErrorDescription]:
    "An unexpected error occurred while trying to join the room.",
  [LangKey.DefaultPreviewInvitedErrorDescription]:
    "An error occurred while loading the room preview, please try again.",
  [LangKey.RoomInvitedAccessError]: "You not have access to this room.",
  [LangKey.RoomInvitedRecommendedRoomError]:
    "The pace to which this room belongs was not found.",
  [LangKey.RoomInvitedNoAccessOrNotFound]:
    "You do not have access to the room or it does not exist.",
  [LangKey.Public]: "Public",
  [LangKey.Space]: "Space",
  [LangKey.Room]: "Room",
  [LangKey.Direct]: "Direct",
  [LangKey.RoomHierarchyCount]: (roomHierarchyCount: string) =>
    `+${roomHierarchyCount} Rooms`,
  [LangKey.JoinedMembers]: (joinedMembersCount: string) =>
    `+${joinedMembersCount} Members`,
  [LangKey.RoomInvitedParentSpaceError]:
    "You cannot access the same parent space.",
  [LangKey.RoomInvitedJoinError]: "This room does not allow anyone to join.",
  [LangKey.RoomPreviewNotSupport]: "This room does not support preview.",

  // #region WelcomeSplash
  [LangKey.WelcomeSplashTitle]: "Welcome to Mirage",
  [LangKey.WelcomeSplashSubtitle]:
    "Invite your friends to chat! Select a Room or a Direct Messages to start a conversation. You can also select an action below to get started quickly.",
  [LangKey.ExploreServers]: "Explore Servers",
  [LangKey.ExploreServersSubtitle]: "join a relevant community",
  [LangKey.SendAMessage]: "Send a message",
  [LangKey.SendAMessageSubtitle]: "to a colleague or friend",
  [LangKey.CheckoutGitHub]: "Checkout GitHub",
  [LangKey.CheckoutGitHubSubtitle]: "to view latest updates",

  // #region Audio Recorder
  [LangKey.RemoveAudio]: "Remove audio",
  [LangKey.StopRecord]: "Stop record",
  [LangKey.SendAudioRecorded]: "Send audio recorded",
  [LangKey.RecordUnavailableError]: "Record Unavailable",
  [LangKey.RecordUnavailableErrorDescription]: "The recorder is not available",
  [LangKey.AudioSendError]: "Audio Send Error",
  [LangKey.AudioSendErrorDescription]: "Failed to send audio",
  [LangKey.PauseRecordError]: "Could not pause recording",
  [LangKey.RecordActiveError]: "Recording is active",
  [LangKey.NoDevicesAvailableError]: "You don't have audio devices",
  [LangKey.AvatarOf]: (spaceName: string) => `Avatar of ${spaceName}`,
  [LangKey.Loading]: "Loading...",

  // #region Errors
  [LangKey.CreateSpaceInProgressError]:
    "There is already a creation in progress.",
  [LangKey.ClientMustBeInitialized]: "The client must be initialized.",
  [LangKey.SpaceNameEmptyError]: "Space name should not be empty.",
  [LangKey.SpaceTopicEmptyError]: "Space description should not be empty.",
}
