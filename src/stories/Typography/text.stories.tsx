import {type Meta, type StoryObj} from "@storybook/react"
import {Text, TruncatedText, type TextProps} from "@/components/ui/typography"

type Story = StoryObj<typeof Text>

const meta: Meta<typeof Text> = {
  component: Text,
}

const textText = "This is a test text"

const render = (
  args: Omit<TextProps, "children" | "size">
): React.JSX.Element => (
  <div className="flex size-full flex-col gap-1">
    <Text size="1" {...args}>
      {textText}
    </Text>

    <Text size="2" {...args}>
      {textText}
    </Text>

    <Text {...args}>{textText}</Text>

    <Text size="4" {...args}>
      {textText}
    </Text>

    <Text size="5" {...args}>
      {textText}
    </Text>

    <Text size="6" {...args}>
      {textText}
    </Text>

    <Text size="7" {...args}>
      {textText}
    </Text>

    <Text size="8" {...args}>
      {textText}
    </Text>

    <Text size="9" {...args}>
      {textText}
    </Text>
  </div>
)

const truncatedRender = (
  args: Omit<TextProps, "children" | "size">
): React.JSX.Element => (
  <TruncatedText text="Truncated text" maxLength={10} {...args} />
)

export const Default: Story = {
  render,
  args: {},
}

export const Bold: Story = {
  render,
  args: {
    weight: "bold",
  },
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

export const Truncated: Story = {
  render: truncatedRender,
  args: {},
}

export default meta
