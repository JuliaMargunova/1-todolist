import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType ={
    id:string
    title:string
    isDone:boolean
}

export type FilterType='all'|'active'|'completed'

function App() {
    const[filter,setFilter]=useState<FilterType>('all')
    const [tasks,setTasks]= useState<Array<TaskType>>( [
        {id:v1(),title:"HTML",isDone:false},
        {id:v1(),title:"CSS",isDone:true},
        {id:v1(),title:"JS",isDone:false},
        {id:v1(),title:"REACT",isDone:true}
    ])
    function addTask(title:string){
        setTasks([{id:v1(),title:title,isDone:false},...tasks])
    }
    function changeStatus(isDone:boolean, idTask:string){
        setTasks(tasks.map(t=>t.id!==idTask ? t : {...t, isDone :isDone}))
    }
    function changeTaskTitle(title:string, idTask:string){
        setTasks(tasks.map(t=>t.id!==idTask ? t : {...t, title :title}))
    }
    function deleteTask(idTask:string){
        setTasks(tasks.filter(t=>t.id!==idTask))
    }
    function filterTask(){
        let filterTasks = tasks;;
        switch (filter){
            case "active": return tasks.filter((t)=>!t.isDone)
            case "completed":return tasks.filter((t)=>t.isDone)
            default : return filterTasks
        }
    }



    return (
        <div className="App">
            <Todolist filter={filter} title={"Books"} tasks={filterTask()} deleteTask={deleteTask} onChangeTitle={changeTaskTitle} setFilterTask={setFilter} changeTaskStatus={changeStatus} addTask={addTask}/>
        </div>
    );
}

export default App;
