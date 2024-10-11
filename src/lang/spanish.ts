import {type LangDefinition} from "@/utils/lang"
import {LangKey} from "./allKeys"

export const spanish: LangDefinition = {
  [LangKey.MoreActions]: "Mas acciones",
  [LangKey.CreateRoom]: "Crear Sala",
  [LangKey.Name]: "Nombre",
  [LangKey.DescriptionOptional]: "Descripción (opcional)",
  [LangKey.RoomDescriptionPlaceholder]:
    "Escribe una breve descripción sobre el propósito de esta sala",
  [LangKey.RoomPrivacy]: "Privacidad de la Sala",
  [LangKey.RoomAddress]: "Dirección de la Sala",
  [LangKey.CreateRoomInvitedTextAssistance]:
    "Solo se pueden unir los que han sido invitados. Puedes cambiar esto desde la configuración de la sala.",
  [LangKey.CreateRoomEncryptionEnableTextAssistance]:
    "No podrás apagarlo más tarde. Los puentes de acceso y la mayoría de bots seguirán sin funcionar.",
  [LangKey.TurnOnEndToEndEncryption]: "Activar el cifrado de extremo a extremo",
  [LangKey.NewSpace]: "Nuevo Espacio",
  [LangKey.CreateSpace]: "Crear Espacio",
  [LangKey.CreateSpaceSpecInfo]:
    "Los espacios son una nueva forma de agrupar habitaciones y personas. Puedes cambiar el tipo de espacio que quieras crear.",
  [LangKey.SpaceName]: "Nombre del espacio",
  [LangKey.SpaceDescriptionPlaceholder]:
    "Escribe una breve descripción sobre el propósito de este espacio",
  [LangKey.PublicRoom]: "Sala pública",
  [LangKey.PrivateRoom]: "Sala privada",
  [LangKey.Accept]: "Aceptar",
  [LangKey.Cancel]: "Cancelar",
  [LangKey.UploadAudio]: "Subir audio",
  [LangKey.Send]: "Enviar",
  [LangKey.LoadError]: "Error de carga",
  [LangKey.UserAvatar]: "Avatar de usuario",
  [LangKey.CallInProgress]: "Llamada en progreso",
  [LangKey.IncomingCall]: "Llamada en espera",
  [LangKey.Connecting]: "Conectando",
  [LangKey.ExpandAll]: "Expandir todo",
  [LangKey.UploadFile]: "Subir archivo",
  [LangKey.ImageUploadedError]:
    "La imagen cargada por el usuario no está disponible actualmente.",
  [LangKey.MessageBy]: "Mensaje de",
  [LangKey.Preview]: "Previsualización",
  [LangKey.ImgMessageZoom]: "Imagen ampliable de mensaje",
  [LangKey.MustBeAValidURL]: "Debe ser una URL válida",
  [LangKey.MustNotBeEmpty]: "No debe estar vacía",
  [LangKey.MustBeAValidUserID]: "Debe ser un ID de usuario válido",
  [LangKey.MustBeAnInteger]: "Debe ser un número",
  [LangKey.Error]: "Error",
  [LangKey.QuickMenu]: "Menú rápido",
  [LangKey.Accessibility]: "Accesibilidad",
  [LangKey.SwitchTheme]: "Cambiar tema",
  [LangKey.Waiting]: "Esperando",
  [LangKey.SyncError]: "Error de sincronización",
  [LangKey.Ready]: "Listo",
  [LangKey.Disconnected]: "Desconectado",
  [LangKey.Syncing]: "Sincronizando",
  [LangKey.CatchingUp]: "Actualizándose",
  [LangKey.Reconnecting]: "Reconectando",
  [LangKey.AboutMe]: "Sobre mí",
  [LangKey.Account]: "Cuenta",
  [LangKey.Created]: "Creado",
  [LangKey.JoinedServer]: "Se unió al servidor",
  [LangKey.LastMessageSentWas]: "Último mensaje enviado hace",
  [LangKey.ViewMessages]: "Ver mensajes ⟶",
  [LangKey.UploadVideo]: "Subir video",
  [LangKey.PleaseRefresh]: "Por favor vuelve a cargar",
  [LangKey.ClientError]: "Error del cliente",
  [LangKey.Reject]: "Rechazar",
  [LangKey.ConnectionError]: "Error de conexión",
  [LangKey.GoToLogin]: "Ir al inicio de sesión",
  [LangKey.ConnectionErrorSubtitle]:
    "Ups hemos perdido la conexión con el servidor, por favor recarga la página o vuelve a iniciar sesión.",
  [LangKey.Reply]: "Responder",
  [LangKey.Resend]: "Reenviar",
  [LangKey.Save]: "Guardar",
  [LangKey.Delete]: "Borrar",
  [LangKey.Settings]: "Ajustes",
  [LangKey.Reload]: "Recargar",
  [LangKey.Add]: "Añadir",
  [LangKey.Search]: "Buscar",
  [LangKey.CreateRoomLowercase]: "Crear sala",
  [LangKey.SearchRooms]: "Buscar salas",
  [LangKey.SearchSpaces]: "Buscar espacios",
  [LangKey.AddToSpace]: "Añadir al espacio",
  [LangKey.CreateDM]: "Crear DM",
  [LangKey.Refresh]: "Actualizar",
  [LangKey.ViewMember]: "Ver miembro",
  [LangKey.FindUser]: "Buscar usuario",
  [LangKey.EqualInfo]: "realizó varios eventos",
  [LangKey.PersonalInfo]: "cambió su información personal",
  [LangKey.ConfigureRoom]: "configuró la sala",
  [LangKey.UploadImage]: "Subir Imagen",
  [LangKey.Close]: "Cerrar",
  [LangKey.CloseModal]: "Cerrar el modal",
  [LangKey.TogglePlayPause]: "Pausar o Reanudar",
  [LangKey.Pause]: "Pausar",
  [LangKey.Play]: "Iniciar",
  [LangKey.AcceptCall]: "Aceptar llamada",
  [LangKey.ToggleSpeaker]: "Activar o desactivar el altavoz",
  [LangKey.ToggleMicrophone]: "Activar o desactivar el micrófono",
  [LangKey.CallOf]: "Colgar llamada",
  [LangKey.ClickToDownload]: "Presiona para descargar",
  [LangKey.Call]: "Llamar",
  [LangKey.VideoCall]: "Video llamada",
  [LangKey.CopyLink]: "Copiar link",
  [LangKey.SearchInRoom]: "Buscar en la room",
  [LangKey.RoomDetails]: "Información de la room",
  [LangKey.ExpandRoster]: "Expandir el listado de miembros",
  [LangKey.DownloadImage]: "Descargar imagen",

  // #region Roster
  [LangKey.People]: "Personas",
  [LangKey.SortMembers]: "Agrupar miembros",
  [LangKey.MembersError]: "Error de miembros",
  [LangKey.ReloadMembers]: "Recargar miembros",
  [LangKey.Admins]: (length: string) => `ADMINISTRADORES — ${length}`,
  [LangKey.Moderators]: (length: string) => `MODERADORES — ${length}`,
  [LangKey.Members]: (length: string) => `MIEMBROS — ${length}`,
  [LangKey.SeenLongAgo]: "Visto hace mucho tiempo",
  [LangKey.LastSeenDate]: (date: string) => `Visto a las ${date}`,
  [LangKey.OpenUserError]: (message: string) =>
    `No se pudo abrir el usuario por: ${message}`,

  // #region Events
  [LangKey.RoomNameChange]: "cambió el nombre de la sala",
  [LangKey.RemoveAvatar]: "eliminó el avatar de esta sala",
  [LangKey.ChangeAvatar]: "cambió el avatar de la sala",
  [LangKey.RemoveTopic]: "eliminó el tema de la sala",
  [LangKey.ChangeTopicTo]: (topic: string) => `cambió el tema a ${topic}`,
  [LangKey.JoinRuleInvite]: "restringió la sala a invitados",
  [LangKey.GuessAccessCanJoin]: "autorizó a cualquiera a unirse a la sala",
  [LangKey.MembershipJoin]: "salió de la sala",
  [LangKey.JoinedToTheRoom]: "entró a la sala",
  [LangKey.ChangeName]: "se cambió el nombre",
  [LangKey.ChangeNameTo]: (user: string) => `se cambió el nombre a ${user}`,
  [LangKey.PutProfilePhoto]: "se puso foto de perfil",
  [LangKey.ChangeProfilePhoto]: "cambió su foto de perfil",
  [LangKey.RemoveProfilePhoto]: "eliminó su foto de perfil",
  [LangKey.Invited]: (user: string) => `invitó a ${user}`,
  [LangKey.Banned]: (user: string) => `baneó a ${user}`,
  [LangKey.ExpandEvents]: "Expandir eventos",
  [LangKey.CollapseEvents]: "Contraer eventos",
  [LangKey.EventBodyWithTime]: (body: string, time: string) =>
    `${body} a las ${time}`,

  [LangKey.DeletedMessage]: (user: string) => `${user} eliminó este mensaje`,

  [LangKey.DeletedMessageBecause]: (user: string, reason: string) =>
    `${user} eliminó este mensaje por "${reason}"`,

  [LangKey.RoomNameChangeTo]: (roomName: string) =>
    `cambió el nombre de la sala a ${roomName}`,

  [LangKey.RemoveMainAddress]: "eliminó la dirección principal de esta sala",

  [LangKey.SetMainAddressAs]: (alias: string) =>
    `estableció la dirección principal de esta sala como ${alias}`,

  [LangKey.HistoryVisibilityShared]:
    "hizo público el historial futuro de la sala para todos los miembros.",

  [LangKey.HistoryVisibilityInvited]:
    "hizo público el historial futuro de la sala para todos los miembros desde el momento en que son invitados.",

  [LangKey.HistoryVisibilityJoined]:
    "hizo público el historial futuro de la sala para todos los miembros desde el momento en que se unieron.",

  [LangKey.HistoryVisibilityWorldReadable]:
    "hizo público el historial futuro de la sala para cualquier persona.",

  [LangKey.JoinRulePublic]:
    "hizo la sala pública para cualquiera que tenga el enlace",

  [LangKey.JoinRuleRestricted]:
    "hizo la sala privada. Solo los administradores pueden invitar ahora",

  [LangKey.GuessAccessForbidden]: "prohibió a los invitados unirse a la sala",

  [LangKey.GuessAccessRestricted]:
    "quitó el acceso de los invitados a la sala. Solo los invitados con tokens válidos pueden unirse.",

  [LangKey.GuessAccessKnock]:
    "habilitó el `knocking` para los invitados. Los invitados deben solicitar acceso para unirse.",

  [LangKey.CanceledInvitation]: (user: string) =>
    `canceló la invitación de ${user}`,

  [LangKey.MembershipBanFrom]: (user: string) => `quitó el ban de ${user}`,

  [LangKey.BannedByReason]: (user: string, reason: string) =>
    `baneó a ${user} por: ${reason}`,

  // #region Login
  [LangKey.DecorativeBackgroundAlt]: "Fondo abstracto para el login",
  [LangKey.WelcomeBack]: "Bienvenido(a) de vuelta",
  [LangKey.LoginSubtitleInfo]:
    "¡Me alegro de verte por aquí! ¿Ya tienes una cuenta? Introduce tu correo electrónico y contraseña para iniciar sesión.",
  [LangKey.UserID]: "Id de usuario",
  [LangKey.Password]: "Contraseña",
  [LangKey.HideToken]: "Ocultar token",
  [LangKey.ShowToken]: "Mostrar token",
  [LangKey.SignIn]: "Iniciar sesión →",
  [LangKey.ForgotPassword]: "¿Has olvidado tu contraseña?",
  [LangKey.NoAccountText]: "No tienes cuenta?",
  [LangKey.SignUp]: "Inscribirse",

  // #region Navigation
  [LangKey.Rooms]: "Salas",
  [LangKey.DirectChats]: "Chats directos",
  [LangKey.Recommended]: "Recomendados",
  [LangKey.GoToHome]: "Ir a inicio",
  [LangKey.RoomsLoadingError]: "Error al cargar las salas",
  [LangKey.ViewDirectChats]: "Ver chats directos",
  [LangKey.ViewNotifications]: "Ver notificaciones",
  [LangKey.SearchAnything]: "Buscar cualquier cosa",
  [LangKey.Calls]: "Llamadas",
  [LangKey.ExitApp]: "Salir de la app",
  [LangKey.LoadingDMs]: "Cargando mensajes directos",
  [LangKey.DirectRooms]: "Salas directas",
  [LangKey.DMTrayFindUserDescription]:
    "Inicia una conversación con alguien usando su nombre o nombre de usuario (@username:mirage.org).",
  [LangKey.EnterNameOrUsername]: "Introduce nombre o nombre de usuario",
  [LangKey.RoomsEmptyTitle]: "Ops, no tienes salas",
  [LangKey.RoomsEmptySubtitle]: "Puedes buscar usuarios y comenzar un chat",
  [LangKey.RecentConversations]: "CONVERSACIONES RECIENTES",
  [LangKey.DMTrayFoundedDescription]:
    "Algunas sugerencias pueden no mostrarse por razones de privacidad. Si no encuentras a quien buscas, envíales tu enlace de invitación a continuación.",
  [LangKey.UserInvalid]: "Usuario inválido",
  [LangKey.InvitationLinkIncorrect]: "El enlace de invitación no es correcto.",
  [LangKey.LinkCopiedSuccessfully]: "Enlace copiado con éxito",
  [LangKey.CopyLinkError]: "No se pudo copiar el enlace por razón",
  [LangKey.OpenChatError]: "No se pudo abrir la sala de chat por razón",
  [LangKey.DMChatWith]: "Chat directo con",
  [LangKey.RoomOwners]: "Propietarios de la sala",

  // #region Notifications
  [LangKey.Notifications]: "Notificaciones",
  [LangKey.LoadingNotifications]: "Cargando notificaciones",
  [LangKey.NotificationsEmpty]: "No tienes notificaciones",
  [LangKey.GoTo]: "Ir a ⟶",
  [LangKey.RemoveNotification]: "Borrar notificación",
  [LangKey.NotificationTypeInvited]: "Has sido invitado(a) a",
  [LangKey.NotificationTypeInvitationRemoved]:
    "La invitación para unirse ha sido retirada de",
  [LangKey.NotificationTypeDowngradeToMember]:
    "Has sido degradado(a) a miembro en",
  [LangKey.NotificationTypeUpgradeToAdmin]: "Has sido promovido(a) a admin en",
  [LangKey.NotificationTypeUpgradeToModerator]:
    "Has sido promovido(a) a moderador en",

  // #region RoomContainer
  [LangKey.AttachSource]: "Añade recursos",
  [LangKey.AttachFile]: "Añade archivo",
  [LangKey.File]: "Archivo",
  [LangKey.Image]: "Imagen",
  [LangKey.AttachImage]: "Añade imagen",
  [LangKey.AttachVideo]: "Añade video",
  [LangKey.Video]: "Video",
  [LangKey.Audio]: "Audio",
  [LangKey.AttachAudio]: "Añade audio",
  [LangKey.LoadingRoom]: "Cargando la sala",
  [LangKey.ChatInputPlaceholder]:
    "Escribe un mensaje o simplemente saluda 👋🏼 hola...",
  [LangKey.RecordAudio]: "Grabar audio",
  [LangKey.SendTextMessage]: "Enviar mensaje de texto",
  [LangKey.EmojiPicker]: "Selector de emoji",
  [LangKey.EmojiIcon]: "Icono de emoji",
  [LangKey.SearchAnyEmoji]: "Busca emojis...",
  [LangKey.MoreVariants]: "Más variantes",
  [LangKey.MessagesError]: "Error de mensajes",
  [LangKey.MessagesErrorSubtitle]:
    "Ocurrió un error mientras se cargaban los mensajes.",
  [LangKey.NoMessages]: "No hay mensajes",
  [LangKey.NoMessagesSubtitle]: "Esta sala es nueva o no tiene mensajes",
  [LangKey.LoadingImageError]: "Ocurrió un error mientras se cargaba la imagen",
  [LangKey.YouHaveBeenInvitedToThisRoom]: "Has sido invitado a esta sala",
  [LangKey.RejectInvitationError]:
    "Ocurrió un error mientras se intentaba rechazar la invitación.",
  [LangKey.JoiningRoomError]:
    "Ocurrió un error mientras se intentaba unirse a la sala.",
  [LangKey.RoomNotFound]: "Sala no encontrada",
  [LangKey.RoomNotFoundDescription]:
    "No tienes acceso a esta sala o esta sala no existe.",
  [LangKey.SeveralPeople]: "Varias personas",
  [LangKey.And]: " y ",
  [LangKey.Typing]: "escribiendo...",
  [LangKey.Are]: "están",
  [LangKey.Is]: "está",

  // #region WelcomeSplash
  [LangKey.WelcomeSplashTitle]: "Bienvenido a Mirage",
  [LangKey.WelcomeSplashSubtitle]:
    "¡Invita a tus amigos a chatear! Selecciona una Sala o Mensajes Directos para comenzar una conversación. También puedes seleccionar una acción a continuación para comenzar rápidamente.",
  [LangKey.ExploreServers]: "Explorar Servidores",
  [LangKey.ExploreServersSubtitle]: "únete a una comunidad relevante",
  [LangKey.SendAMessage]: "Enviar un mensaje",
  [LangKey.SendAMessageSubtitle]: "a un colega o amigo",
  [LangKey.CheckoutGitHub]: "Consulta GitHub",
  [LangKey.CheckoutGitHubSubtitle]: "para ver las últimas actualizaciones",

  // Audio Recorder
  [LangKey.RemoveAudio]: "Borrar audio",
  [LangKey.StopRecord]: "Finalizar grabación",
  [LangKey.SendAudioRecorded]: "Enviar audio grabado",
  [LangKey.RecordUnavailableError]: "Grabadora no disponible",
  [LangKey.RecordUnavailableErrorDescription]:
    "El grabador de audio no esta disponible",
  [LangKey.AudioSendError]: "Error de envío de audio",
  [LangKey.AudioSendErrorDescription]: "No se pudo mandar el audio",
  [LangKey.PauseRecordError]: "No se pudo finalizar la grabación",
  [LangKey.RecordActiveError]: "La grabación está en curso",
  [LangKey.NoDevicesAvailableError]: "No tienes dispositivos de audio",
  [LangKey.AvatarOf]: (spaceName: string) => `Avatar de ${spaceName}`,
  [LangKey.Loading]: "Cargando...",
}
