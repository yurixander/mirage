import useConnection from "@/hooks/matrix/useConnection"
import {type Credentials, ViewPath} from "@/utils/util"
import {useEffect, useState, type FC} from "react"
import {useNavigate} from "react-router-dom"
import useLocalStorage, {LocalStorageKey} from "@/hooks/util/useLocalStorage"
import RoomContainer from "@/containers/RoomContainer/RoomContainer"
import NavigationSection from "@/containers/NavigationSection/NavigationSection"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const AppView: FC = () => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const {connect, disconnect} = useConnection()
  const [connectionError, setConnectionError] = useState(false)

  const {value: credentials} = useLocalStorage<Credentials>(
    LocalStorageKey.Credentials
  )

  // Connect on startup, or redirect to login page if no credentials
  // are found in local storage.
  useEffect(() => {
    // No credentials found, redirect to login page.

    if (credentials === null) {
      navigate(ViewPath.Login)

      return
    }

    connect(credentials)
      .then(async isConnectedAndSynced => {
        if (isConnectedAndSynced) {
          setConnectionError(false)

          return
        }

        setConnectionError(true)
      })
      .catch(() => {
        setConnectionError(true)
      })
  }, [connect, credentials, navigate])

  return (
    <>
      <AlertDialog
        open={connectionError}
        onOpenChange={open => setConnectionError(open)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t(LangKey.ConnectionError)}</AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription>
            {t(LangKey.ConnectionErrorSubtitle)}
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConnectionError(false)}>
              {t(LangKey.Cancel)}
            </AlertDialogCancel>

            <AlertDialogAction onClick={() => navigate(ViewPath.Login)}>
              {t(LangKey.GoToLogin)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex size-full flex-row">
        <NavigationSection
          onLogOut={() => {
            void disconnect().finally(() => {
              navigate(ViewPath.Login)
            })
          }}
        />

        <RoomContainer />
      </div>
    </>
  )
}

export default AppView
