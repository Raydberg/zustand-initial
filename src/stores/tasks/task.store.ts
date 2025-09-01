import { create, StateCreator } from 'zustand';
import { Task, TaskStatus } from '../../interfaces/task.interface';
import { devtools } from 'zustand/middleware';




interface TaskState {
    draggingTaskId?: string

    // tasks: { [key: string]: Task } // "abc": {id:"abc",name:""}
    tasks: Record<string, Task>

    getTaksByStatus: (status: TaskStatus) => Task[]

    setDraggingTaskId: (taskId: string) => void

    removeDraggingTaskId: () => void

    changeProgress: (taskId: string, status: TaskStatus) => void

}


const storeApi: StateCreator<TaskState> = (set, get) => ({
    draggingTaskId: undefined,
    tasks: {
        'ABC-1': { id: 'ABC-1', title: "Task 1", status: 'open' },
        'ABC-2': { id: 'ABC-2', title: "Task 3", status: 'in-progress' },
        'ABC-3': { id: 'ABC-3', title: "Task 4", status: 'open' },
        'ABC-4': { id: 'ABC-4', title: "Task 5", status: 'open' },
    },
    getTaksByStatus: (status: TaskStatus) => {
        const tasks = get().tasks
        return Object.values(tasks).filter(task => task.status === status)
    },
    setDraggingTaskId: (taskId: string) => {
        set({ draggingTaskId: taskId })
    },
    removeDraggingTaskId() {
        set({ draggingTaskId: undefined })
    },
    changeProgress: (taskId: string, status: TaskStatus) => {
        set((state)=>({
            
        }))
    }
})


export const useTaskStore = create<TaskState>()(
    devtools(
        storeApi
    )
)