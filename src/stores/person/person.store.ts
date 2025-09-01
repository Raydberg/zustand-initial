import { create, type StateCreator } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { firebaseStorage } from "../storages/firebase.storage"
import { logger } from "../middlewares/logger.middelware"



interface PersonState {
    firstName: string
    lastName: string
}

interface Actions {
    setFirstName: (value: string) => void
    setLastName: (value: string) => void

}

const storeAPI: StateCreator<PersonState & Actions, [["zustand/persist", unknown], ["zustand/devtools", never]]> = (set) => ({
    firstName: "",
    lastName: "",
    setFirstName: (value: string) => set((state) => ({ firstName: value }), false, 'setFirstName'),
    setLastName: (value: string) => set(state => ({ lastName: value }), false, 'setLastName'),

})


export const usePersonStore = create<PersonState & Actions>()(
    logger(
        persist(
            devtools(
                storeAPI
            ),
            {
                name: "person-storage",
                storage: firebaseStorage
            }
        )
    )
);