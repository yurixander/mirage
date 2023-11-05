import "../styles/Login.sass"
import {useState} from "react"
// import * as sdk from "matrix-js-sdk";
// import {SyncState} from "matrix-js-sdk/lib/sync";
import {useNavigate} from "react-router-dom"
import {Credentials} from "../index"
import Button, {ButtonType} from "../components/Button"
import {smartTimeout} from "../useTimeout"
import {reflectInputValue} from "../util"
import Label from "../components/Label"
import Footer from "../components/Footer"
import Input, {urlConstraint} from "../components/Input"

export default function Login() {
  const cachedCredentials = localStorage.getItem("credentials")

  const defaultCredentials: Credentials = cachedCredentials
    ? JSON.parse(cachedCredentials)
    : {
      baseUrl: "https://matrix-client.matrix.org/",
      userId: "",
      accessToken: "",
    } satisfies Credentials

  const [baseUrl, setBaseUrl] = useState(defaultCredentials.baseUrl)
  const [userId, setUserId] = useState(defaultCredentials.userId)
  const [status, setStatus] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [accessToken, setAccessToken] = useState(
    defaultCredentials.accessToken
  )

  const updateStatus = (newStatus: string) => {
    smartTimeout(() => setStatus(null), 3000)
    setStatus(newStatus)
  }

  const cacheCredentials = () => {
    localStorage.setItem(
      "credentials",
      JSON.stringify({
        baseUrl,
        accessToken,
        userId,
      })
    )
  }

  const login = () => {
    if (isLoading) return

    setIsLoading(true)

    // const client = sdk.createClient({
    //   baseUrl,
    //   accessToken,
    //   userId,
    // });

    // smartTimeout(() => {
    //   if (!isLoading) {
    //     return;
    //   }

    //   client.stopClient();
    //   updateStatus("Timed out. Try again later.");
    //   setIsLoading(false);
    // }, 15000);

    // client.once(sdk.ClientEvent.Sync, function (state, _, res) {
    //   setIsLoading(false);

    //   if (state === SyncState.Error) {
    //     updateStatus(`Sync error: ${res?.error?.message}`);

    //     return;
    //   }

    //   cacheCredentials();
    //   client.stopClient();

    //   navigate(Path.App, {
    //     state: {
    //       baseUrl,
    //       accessToken,
    //       userId,
    //     },
    //   });
    // });

    // // TODO: Inefficient, we only need to test whether the credentials are valid.
    // // We might need to use React context to solve this.
    // client.startClient();
  }

  return (
    <div className="Login --flex -vertical">
      <img className="--float -left -top" src="/pink-glow.svg" />
      <div className="--margin-x2 --text-center">
        <h3>Just one more step</h3>
        <p>Sign in now to get started.</p>
      </div>
      <div className="login-box --z --margin-x1">
        <Input
          isDisabled={isLoading}
          label="Base URL"
          placeholder="Base URL"
          constraints={[urlConstraint]}
          onChange={setBaseUrl}
        />
        <Input
          isDisabled={isLoading}
          label="Access Token"
          placeholder="Access token"
          onChange={setAccessToken}
        />
        <Input
          isDisabled={isLoading}
          label="User ID"
          placeholder="User ID"
          onChange={setUserId}
        />
        <Button
          autoFocus={cachedCredentials != null}
          type={ButtonType.Green}
          onClick={login}
          text="Continue"
          isLoading={isLoading}
        />
        {status !== "" && <div className="status">{status}</div>}
      </div>
      <Footer />
    </div>
  )
}
