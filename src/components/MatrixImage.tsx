import useLocalStorage, {LocalStorageKey} from "@/hooks/util/useLocalStorage"
import {type Credentials} from "@/utils/util"
import {type FC, useEffect, useState} from "react"

const MatrixImage: FC<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = ({src, alt, ...props}) => {
  const [isLoading, setIsLoading] = useState(false)
  const {value} = useLocalStorage<Credentials>(LocalStorageKey.Credentials)

  useEffect(() => {
    if (src === undefined) {
      return
    }

    setIsLoading(true)

    void fetch(src, {
      headers: {
        Authorization: `Bearer ${value?.accessToken}`,
      },
    })
      .then(async _response => {})
      .catch(error => {
        console.error("Failed to load image:", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [src, value?.accessToken])

  return isLoading ? null : <img src={src} alt={alt} {...props} />
}

export default MatrixImage
