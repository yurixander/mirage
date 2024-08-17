function getReplyMessage(body: string): string {
  const index = body.indexOf("\n\n")
  return body.slice(index + 2, body.length)
}

function getQuotedMessage(body: string): string {
  let match = body.split(/\n{2}/)[0]
  match = match.slice(match.indexOf(">", match.indexOf("<")) + 1, match.length)
  return match
}

function getQuotedUser(body: string): string {
  let match = body.split(/\n{2}/)[0]
  match = match.slice(
    match.indexOf("<") + 1,
    match.indexOf(">", match.indexOf("<"))
  )

  if (match.indexOf("@") === 0 && match.includes(":")) {
    return match.slice(1, match.indexOf(":"))
  }
  return match
}

export type ReplyMessageBodyData = {
  message: string
  quotedMessage: string
  quotedUser: string
}

export const parseReplyMessageFromBody = (
  body: string
): ReplyMessageBodyData => {
  return {
    message: getReplyMessage(body),
    quotedMessage: getQuotedMessage(body),
    quotedUser: getQuotedUser(body),
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
