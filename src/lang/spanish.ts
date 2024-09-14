import {LangKey, type LangDefinition} from "@/utils/lang"

export const spanish: LangDefinition = {
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
  [LangKey.EqualInfo]: "ha realizado varios eventos",
  [LangKey.PersonalInfo]: "ha cambiado su información personal",
  [LangKey.ConfigureRoom]: "ha configurado la sala",

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
  [LangKey.RoomNameChange]: "ha cambiado el nombre de la sala",
  [LangKey.RemoveAvatar]: "ha eliminado el avatar de esta sala",
  [LangKey.ChangeAvatar]: "ha cambiado el avatar de la sala",
  [LangKey.RemoveTopic]: "ha eliminado el tema de la sala",
  [LangKey.ChangeTopicTo]: (topic: string) => `ha cambiado el tema a ${topic}`,
  [LangKey.JoinRuleInvite]: "ha restringido la sala a invitados",
  [LangKey.GuessAccessCanJoin]: "ha autorizado a cualquiera a unirse a la sala",
  [LangKey.MembershipJoin]: "ha salido de la sala",
  [LangKey.JoinedToTheRoom]: "ha ingresado a la sala",
  [LangKey.ChangeName]: "ha cambiado el nombre",
  [LangKey.ChangeNameTo]: (user: string) => `ha cambiado el nombre a ${user}`,
  [LangKey.PutProfilePhoto]: "ha puesto una foto de perfil",
  [LangKey.ChangeProfilePhoto]: "ha cambiado la foto de perfil",
  [LangKey.RemoveProfilePhoto]: "ha eliminado la foto de perfil",
  [LangKey.Invited]: (user: string) => `ha invitado a ${user}`,
  [LangKey.Banned]: (user: string) => `ha prohibido a ${user}`,

  [LangKey.DeletedMessage]: (user: string) =>
    `${user} ha eliminado este mensaje`,

  [LangKey.DeletedMessageBecause]: (user: string, reason: string) =>
    `${user} ha eliminado este mensaje porque <<${reason}>>`,

  [LangKey.RoomNameChangeTo]: (roomName: string) =>
    `ha cambiado el nombre de la sala a ${roomName}`,

  [LangKey.RemoveMainAddress]:
    "ha eliminado la dirección principal de esta sala",

  [LangKey.SetMainAddressAs]: (alias: string) =>
    `ha establecido la dirección principal de esta sala como ${alias}`,

  [LangKey.HistoryVisibilityShared]:
    "ha hecho la historia futura de la sala visible para todos los miembros de la sala.",

  [LangKey.HistoryVisibilityInvited]:
    "ha hecho la historia futura de la sala visible para todos los miembros de la sala, desde el momento en que son invitados.",

  [LangKey.HistoryVisibilityJoined]:
    "ha hecho la historia futura de la sala visible para todos los miembros de la sala, desde el momento en que se unieron.",

  [LangKey.HistoryVisibilityWorldReadable]:
    "ha hecho la historia futura de la sala visible para cualquier persona.",

  [LangKey.JoinRulePublic]:
    "ha hecho la sala pública para cualquiera que conozca el enlace",

  [LangKey.JoinRuleRestricted]:
    "ha hecho la sala privada. Solo los administradores pueden invitar ahora",

  [LangKey.GuessAccessForbidden]:
    "ha prohibido a los invitados unirse a la sala",

  [LangKey.GuessAccessRestricted]:
    "ha restringido el acceso de los invitados a la sala. Solo los invitados con tokens válidos pueden unirse.",

  [LangKey.GuessAccessKnock]:
    "ha habilitado el `knocking` para los invitados. Los invitados deben solicitar acceso para unirse.",

  [LangKey.CanceledInvitation]: (user: string) =>
    `ha cancelado la invitación a ${user}`,

  [LangKey.MembershipBanFrom]: (user: string) =>
    `ha levantado la prohibición de ${user}`,

  [LangKey.BannedByReason]: (user: string, reason: string) =>
    `ha prohibido a ${user} por: ${reason}`,

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
  [LangKey.SearchAnyEmoji]: "Buscar emoji",
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
}
