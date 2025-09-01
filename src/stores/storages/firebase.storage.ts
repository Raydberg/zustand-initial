import { createJSONStorage, StateStorage } from "zustand/middleware";


const API = `https://zustand-storage-7da15-default-rtdb.firebaseio.com/zustand`

const storageApi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        try {
            const data = await fetch(`${API}/${name}.json`)
                .then(res => res.json())
            return JSON.stringify(data);
        } catch (error) {
            throw error;
        }
    },
    setItem: async function (name: string, value: string): Promise<void> {
        const data = await fetch(`${API}/${name}.json`,
            {
                method: 'PUT',
                body: value
            }).then(res => res.json())
        console.log(data)
        return;
    },
    removeItem: function (name: string): unknown {
        return sessionStorage.removeItem(name);
    }
}

export const firebaseStorage = createJSONStorage(() => storageApi)