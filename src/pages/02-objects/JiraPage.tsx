import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores/tasks/task.store';

export const JiraPage = () => {

  const getTaksByStatus = useTaskStore(store => store.getTaksByStatus);
  const pendingTask = getTaksByStatus('open');
  const inProgressTask = getTaksByStatus('in-progress');
  const doneTask = getTaksByStatus('done');
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <JiraTasks title='Pendientes' value='open' tasks={pendingTask} />

        <JiraTasks title='Avanzando' value='in-progress' tasks={inProgressTask} />

        <JiraTasks title='Terminadas' value='done' tasks={doneTask} />

      </div>

    </>
  );
};