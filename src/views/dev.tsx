import {useState, type FC} from "react"
import {IoIceCream} from "react-icons/io5"
import useErrorTooltip from "@/hooks/util/useErrorTooltip"

const DevelopmentPreview: FC = () => {
  const [hasError, setError] = useState(false)

  const {renderRef} = useErrorTooltip<HTMLButtonElement>("Ice cream", hasError)

  return (
    <>
      <button
        ref={renderRef}
        onClick={() => {
          setError(prevHasError => !prevHasError)
        }}>
        <IoIceCream size={36} />
      </button>
    </>
  )
}

export default DevelopmentPreview
