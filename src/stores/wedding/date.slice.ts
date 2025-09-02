import { StateCreator } from 'zustand';
export interface DateSlice {
    eventDate: Date //Preferible como primitivo -> number , string para persistencia

    eventYYYMMMDDD: () => string
    eventHHMM: () => string

    setEventDate: (partialDate: string) => void


}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
    eventDate: new Date(),
    eventYYYMMMDDD: () => {
        return get().eventDate.toISOString().split('T')[0]
    },
    eventHHMM: () => {
        const hours = get().eventDate.getHours().toString().padStart(2, '0') //01
        const minutes = get().eventDate.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`;
    },
    setEventDate: (partialDate: string) => {

    }
})