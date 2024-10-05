import {type Meta, type StoryObj} from "@storybook/react"
import {Heading, type HeadingProps} from "@/components/ui/typography"

type Story = StoryObj<typeof Heading>

const meta: Meta<typeof Heading> = {
  component: Heading,
}

const textText = "This is a test heading"

const render = (
  args: Omit<HeadingProps, "children" | "size">
): React.JSX.Element => (
  <div className="flex size-full flex-col gap-1">
    <Heading level="h1" {...args}>
      {textText}
    </Heading>

    <Heading level="h2" {...args}>
      {textText}
    </Heading>

    <Heading level="h3" {...args}>
      {textText}
    </Heading>

    <Heading level="h4" {...args}>
      {textText}
    </Heading>

    <Heading level="h5" {...args}>
      {textText}
    </Heading>

    <Heading level="h6" {...args}>
      {textText}
    </Heading>
  </div>
)

export const Default: Story = {
  render,
  args: {},
}

export const Muted: Story = {
  render,
  args: {
    color: "muted",
  },
}

export const Center: Story = {
  render,
  args: {
    align: "center",
  },
}

export default meta
