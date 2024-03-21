import {useCallback, useEffect, useState} from "react"

const checkIsLinkCopied = async (invitationLink: string): Promise<boolean> => {
  return (await navigator.clipboard.readText()) === invitationLink
}

const useInvitationLink = (userId: string | null) => {
  const [isLinkCopied, setLinkCopied] = useState(false)
  const invitationLink = userId ? `https://matrix.to/#/${userId}` : null

  useEffect(() => {
    if (invitationLink === null) {
      return
    }

    void checkIsLinkCopied(invitationLink).then(isCopied => {
      setLinkCopied(isCopied)
    })
  }, [invitationLink])

  const copyToClipboard = useCallback(async () => {
    if (invitationLink) {
      await navigator.clipboard.writeText(invitationLink)
      setLinkCopied(true)
    }
  }, [invitationLink])

  return {invitationLink, isLinkCopied, copyToClipboard}
}

export default useInvitationLink
