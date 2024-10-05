import {
  Text,
  Heading,
  TruncatedText,
  TruncatedHeading,
} from "@/components/ui/typography"
import {type FC} from "react"
import {IoAccessibility} from "react-icons/io5"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="m-4 flex flex-col items-center gap-0.5 dark:bg-background">
        <TruncatedText text="Some thing else" maxLength={10} />

        <TruncatedHeading text="Some thing else heading" maxLength={3} />
      </div>
    </>
  )
}

export default DevelopmentPreview
