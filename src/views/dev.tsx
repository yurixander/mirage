import {Text, Heading, TruncatedText} from "@/components/ui/typography"
import {type FC} from "react"
import {IoAccessibility} from "react-icons/io5"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="m-4 flex flex-col items-center gap-0.5 dark:bg-background">
        <Text size="1">Algo</Text>
        <Text size="4">Algo</Text>
        <Text size="5">Algo</Text>
        <Text size="6">Algo</Text>
        <Text size="7">Algo</Text>
        <Text size="8">Algo</Text>
        <Text size="9">Algo</Text>

        <Heading level="h1">Some</Heading>
        <Heading level="h2">SOme</Heading>
        <Heading level="h3">SOme</Heading>
        <Heading level="h4">SOme</Heading>
        <Heading level="h5">SOme</Heading>
        <Heading level="h6">
          SOme <IoAccessibility />
        </Heading>

        <TruncatedText text="Some thing else" maxLength={10} />
      </div>
    </>
  )
}

export default DevelopmentPreview
