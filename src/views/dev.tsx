import useIsMountedReference from "@/hooks/util/useIsMountedRef"
import {delay} from "@/utils/util"
import {useEffect, useRef, useState, type FC} from "react"

const DevelopmentPreview: FC = () => {
  const [isSome, setIsSome] = useState(false)
  const [isSomeTwo, setIsSomeTwo] = useState(false)

  return (
    <>
      <div className="m-1 flex gap-5">
        <SomeOne
          isSome={isSome}
          onSomeChange={function (): void {
            setIsSome(prev => !prev)
          }}
        />

        <SomeTwo
          isSomeTwo={isSomeTwo}
          onSomeChange={function (): void {
            setIsSomeTwo(prev => !prev)
          }}
        />
      </div>
    </>
  )
}

const SomeOne: FC<{
  isSome: boolean
  onSomeChange: () => void
}> = ({isSome, onSomeChange}) => {
  const isMountedRef = useRef(isSome)
  const [data, setData] = useState("")

  useEffect(() => {
    isMountedRef.current = isSome

    void delay(1000).then(() => {
      if (isMountedRef.current === isSome) {
        setData(`Nuevo estado ${isSome}`)
      }
    })
  }, [isSome])

  return (
    <div className="flex size-40 flex-col items-center justify-center bg-red-200">
      <span className="p-1 text-red-800">{data}</span>

      <span className="text-red-800">{isSome.toString()}</span>

      <button className="p-1" onClick={onSomeChange}>
        Change Some
      </button>
    </div>
  )
}

const SomeTwo: FC<{
  isSomeTwo: boolean
  onSomeChange: () => void
}> = ({isSomeTwo, onSomeChange}) => {
  const isMountedRef = useIsMountedReference()

  return (
    <div className="flex size-40 flex-col items-center justify-center bg-blue-200">
      <span className="p-1 text-blue-800">
        isMounted {isMountedRef.current.toString()}
      </span>

      <span className="text-blue-800">{isSomeTwo.toString()}</span>

      <button className="p-1" onClick={onSomeChange}>
        Change Some
      </button>
    </div>
  )
}

export default DevelopmentPreview
