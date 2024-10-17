import {type AsyncState} from "@/hooks/util/useMatrixAsyncValue"

type AsyncValueHandlerProps<T> = {
  value: AsyncState<T>
  children: (value: T) => React.ReactNode
  loading: React.ReactNode
  error: (error: Error) => React.ReactNode
}

function AsyncValueHandler<T>({
  value,
  error,
  loading,
  children,
}: AsyncValueHandlerProps<T>): React.ReactNode {
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

export default AsyncValueHandler
