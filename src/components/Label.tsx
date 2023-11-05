import {IconDefinition} from "@fortawesome/fontawesome-common-types"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import "../styles/Label.sass"

type Props = {
  text: string,
  // icon?: IconDefinition,
  center?: boolean
}

export default function Label(props: Props) {
  return <div className="Label" data-center={props.center}>
    {/* {props.icon && <FontAwesomeIcon className="icon" icon={props.icon} />}
    {props.icon && " "} */}
    {props.text}
  </div>
}
