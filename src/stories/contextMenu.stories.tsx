import {type Meta, type StoryObj} from "@storybook/react"
import ContextMenu, {
  ClickActions,
  type ContextMenuProps,
} from "../components/ContextMenu"
import {
  CONTEXT_MENU_ADD,
  CONTEXT_MENU_DELETE,
  CONTEXT_MENU_RELOAD,
} from "@/utils/menu"
import Button from "@/components/Button"

type Story = StoryObj<typeof ContextMenu>

const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
}
const render = (args: ContextMenuProps) => <ContextMenu {...args} />

export const RightClick: Story = {
  render,
  args: {
    actionType: ClickActions.RightClick,
    children: <Button onClick={() => {}} label="Click me" />,
    elements: [
      {...CONTEXT_MENU_ADD, onClick() {}},
      {...CONTEXT_MENU_RELOAD, onClick() {}},
      {...CONTEXT_MENU_DELETE, onClick() {}},
    ],
  },
}

export const LeftClick: Story = {
  render,
  args: {
    actionType: ClickActions.LeftClick,
    children: <Button onClick={() => {}} label="Click me" />,
    elements: [
      {...CONTEXT_MENU_ADD, onClick() {}},
      {...CONTEXT_MENU_RELOAD, onClick() {}},
      {...CONTEXT_MENU_DELETE, onClick() {}},
    ],
  },
}

export default meta
