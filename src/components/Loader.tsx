import "../styles/Loader.sass"

export type LoaderProps = {
  text?: string
}

export default function Loader(props: LoaderProps) {
  return (
    <div className="Loader">
      <div className="loader"></div>
      {props.text && <span className="text">{props.text}</span>}
    </div>
  )
}
