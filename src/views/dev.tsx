import {type FC} from "react"
import {IoIceCream} from "react-icons/io5"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale-subtle.css"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <Tippy
        content="Ice cream"
        arrow
        inertia
        animation="scale-subtle"
        duration={100}
        placement="top">
        <button>
          <IoIceCream size={36} />
        </button>
      </Tippy>
    </>
  )
}

export default DevelopmentPreview
