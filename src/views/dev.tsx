import {type PartialSpace} from "@/containers/NavigationSection/hooks/useSpaces"
import SpacesNavigation, {
  DASHBOARD_SPACE_ID,
} from "@/containers/NavigationSection/SpacesNavigation"
import {useState, type FC} from "react"

const spacesDummy: PartialSpace[] = [
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
  {
    name: "Marketing Digital",
    spaceId: "digital-mkt",
  },
  {
    name: "Recursos Humanos",
    spaceId: "hr-department",
  },
  {
    name: "Soporte Técnico",
    spaceId: "tech-support",
  },
  {
    name: "Finanzas",
    spaceId: "finance-team",
  },
  {
    name: "Investigación",
    spaceId: "research-lab",
  },
  {
    name: "Ventas",
    spaceId: "sales-force",
  },
  {
    name: "Operaciones",
    spaceId: "operations",
  },
  {
    name: "Logística",
    spaceId: "logistics",
  },
  {
    name: "Innovación",
    spaceId: "innovation-hub",
  },
  {
    name: "Atención al Cliente",
    spaceId: "customer-care",
  },
]

const DevelopmentPreview: FC = () => {
  const [selectedSpace, setSelectedSpace] = useState(DASHBOARD_SPACE_ID)

  return (
    <>
      {/* <Spaces
        spaces={spacesDummy}
        isLoading={false}
        spaceSelected={space}
        onCreateSpace={function (): void {
          throw new Error("Function not implemented.")
        }}
        onSpaceSelected={setSpace}
      /> */}

      <SpacesNavigation
        spaces={spacesDummy}
        selectedSpace={selectedSpace}
        onSelectedSpaceChange={setSelectedSpace}
        onCreateSpace={function (): void {
          throw new Error("Function not implemented.")
        }}
      />
    </>
  )
}

export default DevelopmentPreview
