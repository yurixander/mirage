import "../styles/Channel.sass"

export type ChannelProps = {
  name: string
  icon: string
  isActive: boolean
  mentionAmount?: number
}

export default function Channel(props: ChannelProps) {
  return (
    <div className="Channel">
      <text>{props.name}</text>
    </div>
  )
}
