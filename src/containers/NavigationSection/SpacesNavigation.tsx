import {useState, type FC} from "react"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"
import {motion} from "framer-motion"
import Avatar from "boring-avatars"
import {twMerge} from "tailwind-merge"
import {scaleInAnimation} from "@/utils/animations"
import React from "react"
import {type SpaceProps} from "./Space"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

const SpacesNavigation: FC = () => {
  const [selectedSpace, setSelectedSpace] = useState<string>()

  return (
    <ToggleGroup
      onValueChange={value => {
        if (value.length === 0) {
          return
        }

        setSelectedSpace(value)
      }}
      value={selectedSpace}
      className="flex w-max flex-col"
      orientation="vertical"
      type="single">
      {spacesDummy.map((space, index) => (
        <SpaceAvatar
          isSelected={selectedSpace === space.spaceId}
          spaceName={space.name}
          spaceId={space.spaceId}
        />
      ))}
    </ToggleGroup>
  )
}

type SpaceAvatarProps = Omit<SpaceProps, "onSpaceSelected">

const SpaceAvatar = React.forwardRef<HTMLButtonElement, SpaceAvatarProps>(
  ({spaceName, spaceId, avatarUrl, isSelected, classNames}, ref) => {
    return (
      <div className="flex items-center">
        <motion.div
          animate={{height: isSelected ? 20 : 0}}
          className="-ml-0.5 mr-1 h-6 w-1.5 rounded-full bg-purple-500"
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger tabIndex={-1}>
              <motion.div
                tabIndex={-1}
                variants={scaleInAnimation}
                initial="initial"
                whileInView="whileInView"
                whileTap={{scale: 0.9}}
                transition={{
                  duration: 0.2,
                }}>
                <ToggleGroupItem
                  ref={ref}
                  value={spaceId}
                  aria-label={spaceName}
                  variant="outline"
                  className={twMerge(
                    "size-8 overflow-clip border-2 px-0 shadow-none transition-transform hover:bg-transparent focus-visible:scale-125 focus-visible:ring-0 focus-visible:active:scale-100 data-[state=off]:border-transparent data-[state=on]:border-purple-500",
                    classNames
                  )}>
                  {avatarUrl === undefined ? (
                    <Avatar
                      name={spaceName}
                      className="size-full dark:opacity-90"
                      aria-hidden
                      square
                      variant="bauhaus"
                    />
                  ) : (
                    <img
                      aria-hidden
                      className="size-full object-cover dark:opacity-90"
                      src={avatarUrl}
                      alt={`Avatar of ${spaceName}`}
                    />
                  )}
                </ToggleGroupItem>
              </motion.div>
            </TooltipTrigger>

            <TooltipContent side="right">{spaceName}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }
)

SpaceAvatar.displayName = "SpaceAvatar"

export {SpacesNavigation, SpaceAvatar}
