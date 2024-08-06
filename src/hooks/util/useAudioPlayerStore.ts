import {create} from "zustand"

type AudioPlayerStore = {
  audioPlayingId: string | null
  setAudioPlayingId: (audioPlayingId: string) => void
  stopPlayer: () => void
}

const useAudioPlayerStore = create<AudioPlayerStore>(set => ({
  audioPlayingId: null,
  setAudioPlayingId: audioPlayingId => {
    set(_state => ({audioPlayingId}))
  },
  stopPlayer() {
    set(_state => ({audioPlayingId: null}))
  },
}))

export default useAudioPlayerStore
