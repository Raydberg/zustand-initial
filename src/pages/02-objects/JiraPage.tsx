import { useShallow } from 'zustand/shallow';
import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores/tasks/task.store';

export const JiraPage = () => {
  const pendingTask = useTaskStore(useShallow(state => state.getTaksByStatus('open')));
  const inProgressTask = useTaskStore(useShallow(state => state.getTaksByStatus('in-progress')));
  const doneTask = useTaskStore(useShallow(state => state.getTaksByStatus('done')));

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title='Pendientes' status='open' tasks={pendingTask} />
        <JiraTasks title='Avanzando' status='in-progress' tasks={inProgressTask} />
        <JiraTasks title='Terminadas' status='done' tasks={doneTask} />
      </div>
    </>
  );
};