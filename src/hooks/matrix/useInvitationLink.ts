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
  copyToClipboard: () => Promise<void>
}

const useInvitationLink = (userId: string | null): UseInvitationLink => {
  const [isLinkCopied, setLinkCopied] = useState(false)
  const invitationLink = userId ? `https://matrix.to/#/${userId}` : null

  useEffect(() => {
    if (invitationLink === null) {
      return
    }

    void checkIsLinkCopied(invitationLink).then(setLinkCopied)
  }, [invitationLink])

  const copyToClipboard = useCallback(async () => {
    if (invitationLink === null) {
      return
    }

    await navigator.clipboard.writeText(invitationLink)
    setLinkCopied(true)
  }, [invitationLink])

  return {invitationLink, isLinkCopied, copyToClipboard}
}

export default useInvitationLink
