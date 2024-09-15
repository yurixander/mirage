import {LocalStorageKey} from "@/hooks/util/useLocalStorage"
import {english} from "@/lang/english"
import {spanish} from "@/lang/spanish"

export type Lang = "en" | "es"

export type LangDefinition = {
  [key in LangKey]: string | ((...args: string[]) => string)
}

export const translations: Record<Lang, LangDefinition> = {
  en: english,
  es: spanish,
}

export function getDefaultLang(): Lang {
  const lang = localStorage.getItem(LocalStorageKey.Lang)

  try {
    return lang === null ? "en" : JSON.parse(lang)
  } catch {
    return "en"
  }
}

export function setDefaultLang(lang: Lang): void {
  localStorage.setItem(LocalStorageKey.Lang, lang)
}

export function t(key: LangKey, ...args: string[]): string {
  const lang = getDefaultLang()
  const translation = translations[lang][key]

  if (typeof translation === "function") {
    return translation(...args)
  }

  return translation
}

export enum LangKey {
  CreateRoom,
  Name,
  DescriptionOptional,
  RoomDescriptionPlaceholder,
  RoomPrivacy,
  RoomAddress,
  CreateRoomInvitedTextAssistance,
  CreateRoomEncryptionEnableTextAssistance,
  TurnOnEndToEndEncryption,
  NewSpace,
  CreateSpace,
  CreateSpaceSpecInfo,
  SpaceName,
  SpaceDescriptionPlaceholder,
  PublicRoom,
  PrivateRoom,
  Accept,
  Cancel,
  UploadAudio,
  Send,
  LoadError,
  UserAvatar,
  CallInProgress,
  IncomingCall,
  Connecting,
  ExpandAll,
  UploadFile,
  ImageUploadedError,
  MessageBy,
  Preview,
  ImgMessageZoom,
  MustBeAValidURL,
  MustNotBeEmpty,
  MustBeAValidUserID,
  MustBeAnInteger,
  Error,
  QuickMenu,
  Accessibility,
  SwitchTheme,
  Waiting,
  SyncError,
  Ready,
  Disconnected,
  Syncing,
  CatchingUp,
  Reconnecting,
  AboutMe,
  Account,
  Created,
  JoinedServer,
  LastMessageSentWas,
  ViewMessages,
  UploadVideo,
  PleaseRefresh,
  ClientError,
  Reject,
  ConnectionError,
  GoToLogin,
  ConnectionErrorSubtitle,
  Reply,
  Resend,
  Save,
  Delete,
  Settings,
  Reload,
  Add,
  Search,
  CreateRoomLowercase,
  SearchRooms,
  SearchSpaces,
  AddToSpace,
  CreateDM,
  Refresh,
  ViewMember,
  FindUser,
  EqualInfo,
  PersonalInfo,
  ConfigureRoom,
  UploadImage,
  // #region Roster
  People,
  SortMembers,
  MembersError,
  ReloadMembers,
  Admins,
  Moderators,
  Members,
  OpenUserError,
  SeenLongAgo,
  LastSeenDate,

  // #region Events
  DeletedMessage,
  DeletedMessageBecause,
  RoomNameChange,
  RoomNameChangeTo,
  RemoveAvatar,
  ChangeAvatar,
  RemoveMainAddress,
  SetMainAddressAs,
  HistoryVisibilityShared,
  HistoryVisibilityInvited,
  HistoryVisibilityJoined,
  HistoryVisibilityWorldReadable,
  RemoveTopic,
  ChangeTopicTo,
  JoinRuleInvite,
  JoinRulePublic,
  JoinRuleRestricted,
  GuessAccessCanJoin,
  GuessAccessForbidden,
  GuessAccessRestricted,
  GuessAccessKnock,
  CanceledInvitation,
  MembershipBanFrom,
  MembershipJoin,
  JoinedToTheRoom,
  ChangeName,
  ChangeNameTo,
  PutProfilePhoto,
  ChangeProfilePhoto,
  RemoveProfilePhoto,
  Invited,
  Banned,
  BannedByReason,

  // #region Login
  DecorativeBackgroundAlt,
  WelcomeBack,
  LoginSubtitleInfo,
  UserID,
  Password,
  HideToken,
  ShowToken,
  SignIn,
  ForgotPassword,
  NoAccountText,
  SignUp,

  // #region Navigation
  Rooms,
  DirectChats,
  GoToHome,
  RoomsLoadingError,
  ViewDirectChats,
  ViewNotifications,
  SearchAnything,
  Calls,
  ExitApp,
  LoadingDMs,
  DirectRooms,
  DMTrayFindUserDescription,
  EnterNameOrUsername,
  RoomsEmptyTitle,
  RoomsEmptySubtitle,
  RecentConversations,
  DMTrayFoundedDescription,
  UserInvalid,
  InvitationLinkIncorrect,
  LinkCopiedSuccessfully,
  CopyLinkError,
  OpenChatError,
  DMChatWith,
  RoomOwners,

  // #region Notifications
  Notifications,
  LoadingNotifications,
  NotificationsEmpty,
  GoTo,
  RemoveNotification,
  NotificationTypeInvited,
  NotificationTypeInvitationRemoved,
  NotificationTypeDowngradeToMember,
  NotificationTypeUpgradeToAdmin,
  NotificationTypeUpgradeToModerator,

  // #region RoomContainer
  AttachSource,
  AttachFile,
  File,
  Image,
  AttachImage,
  AttachVideo,
  Video,
  Audio,
  AttachAudio,
  LoadingRoom,
  ChatInputPlaceholder,
  RecordAudio,
  SendTextMessage,
  EmojiPicker,
  EmojiIcon,
  SearchAnyEmoji,
  MoreVariants,
  MessagesError,
  MessagesErrorSubtitle,
  NoMessages,
  NoMessagesSubtitle,
  LoadingImageError,
  YouHaveBeenInvitedToThisRoom,
  RejectInvitationError,
  JoiningRoomError,
  RoomNotFound,
  RoomNotFoundDescription,
  SeveralPeople,
  And,
  Typing,
  Are,
  Is,

  // #region WelcomeSplash
  WelcomeSplashTitle,
  WelcomeSplashSubtitle,
  ExploreServers,
  ExploreServersSubtitle,
  SendAMessage,
  SendAMessageSubtitle,
  CheckoutGitHub,
  CheckoutGitHubSubtitle,
}
