import {useState} from "react"
import "../styles/Message.sass"
import {timeFormatter} from "../util"
import {ControlledMenu, MenuItem} from "@szhsin/react-menu"
import '@szhsin/react-menu/dist/index.css'
import useContextMenu from "../hooks/useContextMenu"

export type MessageProps = {
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl: string
  text: string
  timestamp: number
  onAuthorClick: () => void
}

export default function Message(props: MessageProps) {
  const localeTimeString = timeFormatter(props.timestamp)
  const {anchorPoint, open, handleContextMenu, setOpen} = useContextMenu()

  return (
    <div
      className="Message"
      onContextMenu={handleContextMenu}>
      <div className="wrapper">
        <div className="avatar"
          onClick={() => props.onAuthorClick()}>
          <img src={props.authorAvatarUrl} />
        </div>
        <div className="content">
          <span
            className="author-name"
            style={{color: props.authorDisplayNameColor}}
            onClick={() => props.onAuthorClick()}>
            {props.authorDisplayName}
          </span>
          <div className="text">{props.text}</div>
        </div>
        <time className="time">
          {localeTimeString}
        </time>
      </div>
      <ControlledMenu
        className={"Menu"}
        anchorPoint={anchorPoint}
        state={open ? 'open' : 'closed'}
        direction="right"
        onClose={() => setOpen(false)}
      >
        <MenuItem>Reply</MenuItem>
        <MenuItem>Pin</MenuItem>
        <MenuItem>Resend</MenuItem>
      </ControlledMenu>
    </div>
  )
}
