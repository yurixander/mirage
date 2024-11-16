import {useState, type FC} from "react"
import MessageContainer from "./MessageContainer"
import {twMerge} from "tailwind-merge"
import {Text} from "./ui/typography"
import {assert} from "@/utils/util"
import ImageMessage, {
  type ImageMessageData,
  type ImageMessageProps,
} from "./ImageMessage"

export type ImageGroupProps = {
  images: ImageMessageProps[]
}

export type ImageGroupData = {
  images: ImageMessageData[]
}

type GroupProps = {
  images: ImageMessageData[]
  onClick: () => void
}

const ImageGroup: FC<ImageGroupProps> = ({images}) => {
  assert(images.length > 3, "Invalid Image Array")
  const [isOpen, setIsOpen] = useState(false)

  const imageOpen = (
    <>
      {images.map((img, index) => (
        <ImageMessage
          authorDisplayName={img.authorDisplayName}
          contextMenuItems={img.contextMenuItems}
          messageId={img.messageId}
          onAuthorClick={img.onAuthorClick}
          onClickImage={img.onClickImage}
          timestamp={img.timestamp}
          userId={img.userId}
          key={index}
          imageUrl={img.imageUrl}
        />
      ))}
    </>
  )

  return isOpen ? (
    imageOpen
  ) : (
    <MessageContainer
      authorDisplayName="Lazaro"
      onAuthorClick={() => {}}
      timestamp={0}
      userId="userId">
      <Group
        onClick={() => {
          setIsOpen(true)
        }}
        images={images}
      />
    </MessageContainer>
  )
}

export default ImageGroup

const Group: FC<GroupProps> = ({images, onClick}) => {
  return (
    <div className="flex size-60 flex-col gap-1 overflow-hidden rounded-xl border bg-white shadow dark:bg-black">
      <div className="flex size-full gap-1">
        <Image imageUrl={images[0].imageUrl} />
        <Image imageUrl={images[1].imageUrl} />
      </div>
      <div className="flex size-full gap-1">
        <Image imageUrl={images[2].imageUrl} />
        <div className="relative flex size-full items-center justify-center">
          {images.length === 4 ? (
            <Image imageUrl={images[3].imageUrl} />
          ) : (
            <>
              <Image className="blur-sm" imageUrl={images[3].imageUrl} />
              <button
                onClick={onClick}
                className="absolute rounded bg-black p-1 opacity-50 shadow">
                <Text className="text-white" size="6">
                  + {images.length - 4}
                </Text>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const Image: FC<{imageUrl?: string; className?: string}> = ({
  imageUrl,
  className = "",
}) => {
  return (
    <div className="flex size-full items-center justify-center overflow-hidden bg-neutral-900">
      <img
        className={twMerge("pointer object-cover", className)}
        src={imageUrl}
        alt=""
      />
    </div>
  )
}
