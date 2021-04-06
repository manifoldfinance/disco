import create from 'zustand/vanilla'

type Web3ReactState = {
  account: string
}

export const store = create<Web3ReactState>(() => ({
  account: '0xabc',
}))
