import type {AsyncState} from "@/hooks/util/useAsyncValue"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import type React from "react"

type AsyncValueHandlerProps<T> = {
  value: AsyncState<T>
  children: (value: T) => React.ReactNode
  loading?: React.ReactNode
  error?: (error: Error) => React.ReactNode
  idle?: React.ReactNode
}

function AsyncValueHandler<T>({
  value,
  error,
  loading,
  idle,
  children,
}: AsyncValueHandlerProps<T>): React.ReactNode {
  const {t} = useTranslation()

  switch (value.status) {
    case "loading": {
      return loading ?? <p>{t(LangKey.Loading)}</p>
    }

    case "success": {
      return children(value.data)
    }

    case "error": {
      return error?.(value.error) ?? <p>Error: {value.error.message}</p>
    }

    case "idle": {
      return idle ?? <></>
    }

    default: {
      return <></>
    }
  }
}

export default AsyncValueHandler
