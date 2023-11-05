import "../styles/Loader.sass"

type Props = {
  text?: string
}

export default function Loader(props: Props) {
  return <div className="Loader">
    <div className="loader">
    </div>{props.text && <span className="text">{props.text}</span>}
  </div>
}
