import React, {ChangeEvent} from "react";
import {FilterType, TaskType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";


type TodolistType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    addTask: (title: string, todolistId: string) => void
    setFilterTask: (filter: FilterType, todolistId: string) => void
    changeTaskStatus: (isDone: boolean, idTask: string, todolistId: string) => void
    deleteTask: (idTask: string, todolistId: string) => void
    filter: FilterType
    onChangeTitle: (title: string, id: string, todolistId: string) => void
    removeTodolist:(todolistId:string)=>void
}
export const Todolist: React.FC<TodolistType> = ({title, filter, ...props}) => {


    function changeStatus(e: ChangeEvent<HTMLInputElement>, idTask: string) {
        props.changeTaskStatus(e.currentTarget.checked, idTask, props.todolistId)
    }

    function onClickDeleteHandler(idTask: string) {
        props.deleteTask(idTask, props.todolistId)
    }
    function onChangeTitleHandler(title: string, id: string) {
        props.onChangeTitle(title, id, props.todolistId)
    }

    function onRemoveTodolist(){
        props.removeTodolist(props.todolistId)
    }
    const errorMessage = {
        color: 'red'
    }

    const buttonActive = {
        background: 'green'
    }

    return (
        <div>
            <h3><button onClick={onRemoveTodolist}>x</button>{title}</h3>
            <AddItemForm addItem={(newTitle)=>props.addTask(newTitle, props.todolistId)} />
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li key={t.id} className={t.isDone ? 'completed_task' : ''}>
                            <button onClick={() => onClickDeleteHandler(t.id)}>x</button>
                            <input type="checkbox" onChange={(e) => changeStatus(e, t.id)}
                                   checked={t.isDone}/>
                            <EditableSpan title={t.title} onChangeTitle={(title) => onChangeTitleHandler(title, t.id)}/>
                        </li>)
                })}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active_button' : ''}
                        onClick={() => props.setFilterTask('all', props.todolistId)}>All
                </button>
                <button className={filter === 'active' ? 'active_button' : ''}
                        onClick={() => props.setFilterTask('active', props.todolistId)}>Active
                </button>
                <button className={filter === 'completed' ? 'active_button' : ''}
                        onClick={() => props.setFilterTask('completed', props.todolistId)}>Completed
                </button>
            </div>
        </div>
    )
}



