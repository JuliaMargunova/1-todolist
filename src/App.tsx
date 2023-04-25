import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'
export type Todolist = {
    id: string
    name: string
    filter: FilterType
}
type TasksStateType = {
    [key:string]:Array<TaskType>
}

function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();
    const [todoLists, setTodoLists] = useState<Array<Todolist>>([
        {id: todolistId1, name: "Technogies", filter: 'all'},
        {id: todolistId2, name: "Food", filter: 'active'}
    ])

    const [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "REACT", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Meet", isDone: false},
            {id: v1(), title: "Brad", isDone: false},
            {id: v1(), title: "Cupcake", isDone: false}
        ]
    })

    function addTask(title: string, todolistId: string) {
        const task = {id: v1(), title: title, isDone: false}
        const tasks = tasksObj[todolistId];
        const newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj})
        //setTasks({...tasksObj,[todolistId]:[...tasksObj[todolistId], {id: v1(), title: title, isDone: false}]})
    }

    function changeStatus(isDone: boolean, idTask: string, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const newTasks = tasks.map(t => t.id !== idTask ? t : {...t, isDone: isDone});
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj})
        //setTasks({...tasksObj, [todolistId]: tasksObj[todolistId].map(t => t.id !== idTask ? t : {...t, isDone: isDone})})
    }

    function changeTaskTitle(title: string, idTask: string, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const newTasks = tasks.map(t => t.id !== idTask ? t : {...t, title: title});
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj})
        //setTasks(tasks.map(t => t.id !== idTask ? t : {...t, title: title}))
    }

    function removeTask(idTask: string, todolistId: string) {

        // setTasks({...tasksObj,tasksObj[todolistId].filter(t => t.id !== idTask))}
        tasksObj[todolistId] = tasksObj[todolistId].filter(t => t.id !== idTask)
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterType, todolistId: string) {

        setTodoLists(todoLists.map(t => t.id !== todolistId ? t : {...t, filter: value}))
    }

    function removeTodolist(todolistId: string) {
        setTodoLists(todoLists.filter(tl => tl.id != todolistId))
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }
    function addTodolist(title:string){
        const todoList :Todolist =  {id: v1(), name: title, filter: 'all'};
        setTodoLists([todoList,...todoLists])
        setTasks({...tasksObj,[todoList.id]:[]})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todoLists.map(tl => {
                    function filterTask() {
                        let filterTasks = tasksObj[tl.id];
                        switch (tl.filter) {
                            case "active":
                                return filterTasks.filter((t) => !t.isDone)
                            case "completed":
                                return filterTasks.filter((t) => t.isDone)
                            default :
                                return filterTasks
                        }

                    }

                    return <Todolist todolistId={tl.id} key={tl.id} filter={tl.filter} title={tl.name}
                                     tasks={filterTask()}
                                     deleteTask={removeTask} onChangeTitle={changeTaskTitle}
                                     setFilterTask={(filter, tlId) => changeFilter(filter, tlId)}
                                     changeTaskStatus={changeStatus}
                                     addTask={addTask} removeTodolist={removeTodolist}/>
                })
            }
        </div>)

}

export default App;
