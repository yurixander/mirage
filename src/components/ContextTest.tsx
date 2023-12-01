import "../styles/ContextTest.sass"
import {useModal} from "../hooks/useModal"
import Modal from "./Modal"
import Button from "./Button"

export default function ContextTest() {
  const {elements, showModal, closeModal} = useModal()

  const dialogOne = <Button
    onClick={() => {closeModal(dialogOne)}}
    text={"Close1"} />
  const dialogTwo = <Button
    onClick={() => {closeModal(dialogTwo)}}
    text={"Close2"} />
  const dialog3 = <Button
    onClick={() => {closeModal(dialog3)}}
    text={"Close3"} />
  const dialog4 = <Button
    onClick={() => {closeModal(dialog4)}}
    text={"Close4"} />
  const dialog5 = <Button
    onClick={() => {closeModal(dialog5)}}
    text={"Close5"} />
  const dialog6 = <Button
    onClick={() => {closeModal(dialog6)}}
    text={"Close6"} />

  return (
    <>
      {elements.length > 0 && <Modal
        dialogs={elements} />}
      <Button onClick={() => {
        showModal(dialogOne)
        showModal(dialogTwo)
        showModal(dialog3)
        showModal(dialog4)
        showModal(dialog5)
        showModal(dialog6)
      }} text={"Show"} />
    </>
  )
}
