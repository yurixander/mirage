export type ReplyMessageBodyData = {
  message: string
  quotedMessage: string
  quotedUser: string
}

export const parseReplyMessageFromBody = (
  body: string
): ReplyMessageBodyData => {
  const message = body.slice(body.indexOf("\n\n") + 2, body.length)

  const match = body.split(/\n{2}/)[0]

  const quotedMessage = match.slice(
    match.indexOf(">", match.indexOf("<")) + 1,
    match.length
  )

  let quotedUser = match.slice(
    match.indexOf("<") + 1,
    match.indexOf(">", match.indexOf("<"))
  )

  if (quotedUser.indexOf("@") === 0 && quotedUser.includes(":")) {
    quotedUser = quotedUser.slice(1, match.indexOf(":"))
  }

  return {
    message,
    quotedMessage,
    quotedUser,
  }
}

export const validateReplyMessage = (body: string): boolean => {
  return !(
    !body.includes("\n\n") ||
    !body.includes("<") ||
    !body.includes(">") ||
    body.indexOf(">") > 0
  )
}
