import { useState } from "react";
export const TaskCreator = (props) => {
    const [newTaskName, setNewTaskName] = useState("");
    const updateNewTaskName = e => setNewTaskName(e.target.value);
    const createNewTask = () => {
        props.callback(newTaskName);
        setNewTaskName("");
    };
    return (
        <div className="my-1">
            <input type="text" className="form-control" placeholder="Add Task..." value={newTaskName} onChange={updateNewTaskName}  />
            <button className="btn btn-primary" onClick={createNewTask}>Add Task</button>
        </div>
    )
}