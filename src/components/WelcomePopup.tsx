import "../styles/WelcomePopup.sass"
import Button, {ButtonStyle} from "./Button"
import Modal from "./Modal"
import {ReactComponent as Stars} from "../../public/icons/stars.svg"
import {ReactComponent as DotGrid} from "../../public/icons/dot-grid.svg"

export default function WelcomePopup() {
  return (
    <Modal
      isOpen={() => { }}
      onClose={() => { }}
      dialogs={
        [<div className="WelcomePopup">
          <div className="header">
            <h3>Hey you!</h3>
            <h1>You’re beautiful.</h1>
            <Stars className="stars" />
          </div>
          <div className="body">
            <span className="text">
              <b>Did you know that?</b> You’re a beautiful person, with a charming personality. My grandmother always used to say—”Cows are beautiful cloven-hooved herbivores, and so should you!”
            </span>
            <span>
              I hope that resonates with you as much as it did with me.
            </span>
            <div className="dot-grid">
              <DotGrid />
            </div>
          </div>
          <div className="actions">
            <Button
              text="Got it, thanks ⟶"
              style={ButtonStyle.Default}
              onClick={() => {/* TODO: Handle click on View messages button. */}} />
          </div>
        </div>]}
    />
  )
}
