import useValue, {type AnyValue, ValueState} from "@/hooks/util/useValue"
import {delay} from "@/utils/util"
import React from "react"
import {useEffect, type FC} from "react"

const DevelopmentPreview: FC = () => {
  const {value, action} = useValue("")

  useEffect(() => {
    action(async () => {
      await delay(2000)

      return "Something"
    })
  }, [action])

  return (
    <ValueHandler
      value={value}
      callback={<p>Loading</p>}
      boundary={error => <p>{error.message}</p>}>
      {response => <p className="bg-blue-500">{response}</p>}
    </ValueHandler>
  )
}

type ValueHandlerProps<T> = {
  value: AnyValue<T>
  children: (value: T) => React.ReactNode
  callback?: React.ReactNode
  boundary?: (error: Error) => React.ReactNode
}

function ValueHandler<T>({
  value,
  boundary,
  callback,
  children,
}: ValueHandlerProps<T>): React.ReactNode {
  switch (value?.kind) {
    case ValueState.Loading: {
      return callback
    }
    case ValueState.Loaded: {
      return children(value.data)
    }
    case ValueState.Error: {
      return boundary === undefined ? <></> : boundary(value.data)
    }
    case undefined: {
      return <></>
    }
  }
}

export default DevelopmentPreview
