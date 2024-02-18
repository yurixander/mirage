import {twMerge} from "tailwind-merge"

type TailwindComputedValue = `${number}px` | `${number}%` | `${number}rem`

type TailwindStaticState = "inset" | "hover" | "focus"

type TailwindState<Prefix extends string> =
  | Prefix
  | `${TailwindStaticState}:${Prefix}`
  | `dark:${Prefix}`
  | `dark:${TailwindStaticState}:${Prefix}`

type TailwindFactor = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

type TailwindComputed<Prefix extends string, Suffix extends string> =
  | `${TailwindState<Prefix>}-${Suffix}`
  | `${TailwindState<Prefix>}-[${TailwindComputedValue}]`

// TODO: Cleanup & organize, and add more classes.
type TailwindStaticClass =
  | "items-start"
  | "items-center"
  | "items-end"
  | "justify-start"
  | "justify-center"
  | "justify-end"
  | "absolute"
  | "bg-transparent"
  | "flex"
  | "block"
  | "border"
  | "border-solid"
  | "inline-flex"
  | "flex-col"
  | "fixed"
  | "inline-block"
  | "content-center"

type TailwindComputedClass =
  | TailwindComputed<"inset", "0">
  | TailwindComputed<"gap", `${TailwindFactor}`>

type TailwindClass = TailwindStaticClass | TailwindComputedClass

export type TwClassName = Array<TailwindClass | TailwindClass[] | undefined>

function tw(...classes: TwClassName): string {
  return twMerge(classes)
}

export default tw
