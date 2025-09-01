import { create, StateCreator } from 'zustand';
import { Task, TaskStatus } from '../../interfaces/task.interface';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid'
// import { produce } from 'immer';
import { immer } from 'zustand/middleware/immer';



interface TaskState {
    draggingTaskId?: string

    // tasks: { [key: string]: Task } // "abc": {id:"abc",name:""}
    tasks: Record<string, Task>

    getTaksByStatus: (status: TaskStatus) => Task[]

    addTask: (title: string, status: TaskStatus) => void
    totalTask: () => number

    setDraggingTaskId: (taskId: string) => void

    removeDraggingTaskId: () => void

    changeTaskStatus: (taskId: string, status: TaskStatus) => void
    onTaskDrop: (status: TaskStatus) => void
}


const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
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
    addTask: (title: string, status: TaskStatus) => {

        const newTask = { id: uuid(), title, status }
        //? Con middleware
        set(state => {
            state.tasks[newTask.id] = newTask
        })

        //    const newTask = {id:uuid(),title:title,status:status}
        //? Requiere paquete de immer
        // set(produce((state: TaskState) => (
        //     state.tasks[newTask.id] = newTask
        // )))
        //? Tradicional
        // set(state => ({
        //     tasks: {
        //         ...state.tasks,
        //         [newTask.id]: newTask
        //     }
        // }))
    },
    totalTask: () => {
        return Object.values(get().tasks).length;
    },
    setDraggingTaskId: (taskId: string) => {
        set({ draggingTaskId: taskId })
    },
    removeDraggingTaskId() {
        set({ draggingTaskId: undefined })
    },
    changeTaskStatus: (taskId: string, status: TaskStatus) => {
        const task = { ...get().tasks[taskId], status };
        set(state => {
            state.tasks[taskId] = task;
        })
        // set((state) => ({
        //     tasks: {
        //         ...state.tasks,
        //         [taskId]: task,
        //     }
        // }))
    },
    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId;
        if (!taskId) return;
        get().changeTaskStatus(taskId, status)
        get().removeDraggingTaskId()
    }
})


export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            immer(
                storeApi
            )
            , { name: "task-store" }
        )
    )
)