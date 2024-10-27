import {type ValueState} from "@/hooks/util/useValueState"

type ValueStateHandlerProps<T> = {
  value: ValueState<T>
  children: (value: T) => React.ReactNode
  loading: React.ReactNode
  error: (error: Error) => React.ReactNode
}

function ValueStateHandler<T>({
  value,
  error,
  loading,
  children,
}: ValueStateHandlerProps<T>): React.ReactNode {
  switch (value.status) {
    case "loading": {
      return loading
    }

    case "success": {
      return children(value.data)
    }

    case "error": {
      return error(value.error)
    }

    default: {
      return <></>
    }
  }
}

export default ValueStateHandler
