import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import AlertDialog, {type AlertDialogProps} from "../components/AlertDialog"

type Story = StoryObj<typeof AlertDialog>

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
}
const render = (args: AlertDialogProps): React.JSX.Element => (
  <AlertDialog {...args} />
)

export const Default: Story = {
  render,
  args: {
    title: "Alert Dialog",
    message:
      "This component will be used to show the user, like errors or important something else messages of alert.",
  },
}

export default meta
