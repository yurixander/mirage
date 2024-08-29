import {useCallback, useEffect, useState} from "react"

const checkIsLinkCopied = async (invitationLink: string): Promise<boolean> => {
  try {
    const textClipboard = await navigator.clipboard.readText()

    return textClipboard === invitationLink
  } catch {
    // If the user has an empty clipboard or if permission to access the clipboard was not granted.

    return false
  }
}

type UseInvitationLink = {
  invitationLink: string | null
  isLinkCopied: boolean
  isValidUser: boolean
  copyToClipboard: () => void
}

const userIdPattern = new RegExp(
  // `@` [username] `:` [domain]
  /^@[\w./=\-]+:[\d.a-z\-]+\.[a-z]{2,}$/i
)

const useInvitationLink = (userId?: string): UseInvitationLink => {
  const [isLinkCopied, setLinkCopied] = useState(false)
  const isValidUser = userId !== undefined && userIdPattern.test(userId)
  const invitationLink = isValidUser ? `https://matrix.to/#/${userId}` : null

  useEffect(() => {
    if (invitationLink === null) {
      return
    }

    void checkIsLinkCopied(invitationLink).then(setLinkCopied)
  }, [invitationLink])

  const copyToClipboard = useCallback(() => {
    if (invitationLink === null) {
      throw new Error("The invitation link is not correct.")
    }

    navigator.clipboard
      .writeText(invitationLink)
      .then(() => {
        setLinkCopied(true)
      })
      .catch(error => {
        throw new Error(`Could not copy link by reason: ${error}`)
      })
  }, [invitationLink])

  return {invitationLink, isLinkCopied, copyToClipboard, isValidUser}
}

export default useInvitationLink
