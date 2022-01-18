import { useState, useEffect } from "react";
import { TaskRow } from "./componets/taskRow";
import { TaskBanner } from "./componets/taskBanner";
import { TaskCreator } from "./componets/taskCreator";
import { VisibilityControl } from "./componets/visibilityControl";
function App() {
  // estados iniciales
  const [userName, setUserName] = useState("");
  const [taskItems, setTaskItems] = useState([
    { name: "task1", done: false },
    { name: "task2", done: false },
    { name: "task3", done: true },
    { name: "task4", done: false },
  ]);
  const [showCompleted, setShowCompleted] = useState(true);
  // Antes de ejeccutar el useEffect, se ejecuta el useState
  useEffect(() => {
    const data = localStorage.getItem("task");
    if(data !== null) {
      setTaskItems(JSON.parse(data));
    } else {
      setUserName("Danniel Navas");
      setTaskItems([
        { name: "task1example", done: false },
        { name: "task2example", done: false },
        { name: "task3", done: true },
        { name: "task4", done: false },
      ]);
      setShowCompleted(true);
    }
  },[]);

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(taskItems));
  }, [taskItems]);

  // Funciones reactjs para manejar los estados
  const addNewTask = (taskName) => {
    if (!taskItems.find((t) => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  };

  const toggleTask = (task) =>
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  const taskTableRows = (doneValue) =>
    taskItems
    .filter((t) => t.done === doneValue)
    .map((task) => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
    ));
  // html del componente de reactjs
  return (
    <div>

      {/* componentes */}
      <TaskBanner userName={userName} taskItems={taskItems} />
      <TaskCreator callback={addNewTask} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>{taskTableRows(false)}</tbody>
      </table>

      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl
          description="completed task"
          isChecked={showCompleted}
          callback={(checked) => setShowCompleted(checked)}
        />
      </div>

      { showCompleted && (
        <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>{taskTableRows(true)}</tbody>
      </table>
      ) }
    </div>
  );
}

export default App;
