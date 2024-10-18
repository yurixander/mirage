import type {Meta, StoryObj} from "@storybook/react"
import SpacesNavigation, {
  type SpaceNavigationProps,
  DASHBOARD_SPACE_ID,
} from "@/containers/NavigationSection/SpacesNavigation"
import type React from "react"
import {useState} from "react"

type Story = StoryObj<typeof SpacesNavigation>

const meta: Meta<typeof SpacesNavigation> = {
  component: SpacesNavigation,
}

const SpacesNavigationWithState = (
  args: SpaceNavigationProps
): React.JSX.Element => {
  const [selectedSpace, setSelectedSpace] = useState(args.selectedSpace)

  return (
    <SpacesNavigation
      {...args}
      selectedSpace={selectedSpace}
      onSelectedSpaceChange={spaceId => {
        setSelectedSpace(spaceId)
        args.onSelectedSpaceChange(spaceId)
      }}
    />
  )
}

const spacesDummy = [
  {
    name: "Proyecto Alpha",
    spaceId: "alpha-2023",
  },
  {
    name: "Desarrollo Web",
    spaceId: "web-dev-team",
  },
  {
    name: "Diseño UX/UI",
    spaceId: "ux-ui-design",
  },
]

export const Default: Story = {
  render: SpacesNavigationWithState,
  args: {
    spaces: spacesDummy,
    selectedSpace: DASHBOARD_SPACE_ID,
    onSelectedSpaceChange: spaceId => {
      console.log(`Espacio seleccionado: ${spaceId}`)
    },
    onCreateSpace: () => {},
  },
}

export default meta
