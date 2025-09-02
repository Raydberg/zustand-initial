import { useState } from "react"
import Swal from "sweetalert2"
import { useTaskStore } from "../stores/tasks/task.store"
import { TaskStatus } from "../interfaces/task.interface"


interface Options {
    status: TaskStatus
}

export const useTasks = ({ status }: Options) => {

    const isDragging = useTaskStore(state => !!state.draggingTaskId)
    const onTaskDrop = useTaskStore(state => state.onTaskDrop)
    const [onDragOver, setOnDragOver] = useState(false)
    const addTask = useTaskStore(state => state.addTask)
    const handleAddTask = async () => {
        const { isConfirmed, value } = await Swal.fire({
            title: "Nueva tarea",
            input: 'text',
            inputLabel: 'Nombre de la tarea',
            inputPlaceholder: 'Ingrese el nombre de la tarea',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Debe ingresar un nombre para la tarea'
                }
            }
        })
        if (!isConfirmed) return;

        addTask(value, status)
    }
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log("handleDragOver", event)
        setOnDragOver(true)
    }
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log("handleDragLeave", event)
        setOnDragOver(false)
    }
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log("handleDrop", event)
        console.log(status)
        onTaskDrop(status)
    }



    return {
        isDragging,
        onDragOver,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDrop
    }
}