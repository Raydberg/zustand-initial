import { create } from "zustand";
import { persist } from "zustand/middleware";



interface Bear {
    id: number
    name: string
}

interface BearState {
    blackBears: number
    polarBearn: number
    pandaBear: number
    bears: Bear[]

    totalBears: () => number

    increaseBlackBear: (by: number) => void
    increasePolarBear: (by: number) => void
    increasePandaBear: (by: number) => void
    doNothing: () => void
    addBear: () => void
    clearBear: () => void
}


export const useBearStore = create<BearState>()(
    persist(
        (set, get) => ({
            blackBears: 10,
            polarBearn: 5,
            pandaBear: 1,
            bears: [{ id: 1, name: "Oso 1" }],

            totalBears: () => get().blackBears + get().polarBearn + get().pandaBear,

            increaseBlackBear: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
            increasePolarBear: (by: number) => set((state) => ({ polarBearn: state.polarBearn + by })),
            increasePandaBear: (by: number) => set((state) => ({ pandaBear: state.pandaBear + by })),
            doNothing: () => set(state => ({ bears: [...state.bears] })),
            // doNothing: () => set(state => ({ bears: [...get().bears] })), //Lo mismo que ...state.bears
            addBear: () => set(state => ({
                bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }]
            })),
            clearBear: () => set({ bears: [] }),

        })
        , { name: "bears-store" }
    )

)