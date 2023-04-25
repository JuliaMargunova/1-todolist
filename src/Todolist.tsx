import React, {ChangeEvent, useState} from "react";
import {FilterType, TaskType} from "./App";
import {EditableSpan} from "./EditableSpan";


type TodolistType = {
    title: string
    tasks: TaskType[]
    addTask: (title: string) => void
    setFilterTask: (filter: FilterType) => void
    changeTaskIsDone: (isDone: boolean, idTask: string) => void
    deleteTask: (idTask: string) => void
    filter: FilterType
    onChangeTitle:(title:string, id:string)=>void
}
export const Todolist: React.FC<TodolistType> = ({title, filter, ...props}) => {
    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState<string>("");

    function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
        setError('')
        if (e.currentTarget.value.trim() !== '') {
            setNewTitle(e.currentTarget.value.trim())
        }

    }

    function addTask() {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle)
            setNewTitle('')
        } else {
            setError("Title is required");
        }
    }

    function onClickAddTaskHandler() {
        addTask()
    }

    function onChangeIsDoneHandler(e: ChangeEvent<HTMLInputElement>, idTask: string) {
        props.changeTaskIsDone(e.currentTarget.checked, idTask)
    }

    function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    function onClickDeleteHandler(idTask: string) {
        props.deleteTask(idTask)
    }
    function onChangeTitleHandler(title: string, id:string) {
        props.onChangeTitle(title,id)
    }


    const errorMessage = {
        color: 'red'
    }

    const buttonActive = {
        background: 'green'
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error && 'error_input'} value={newTitle} onChange={onChangeInput}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
                {error && <div className={'error_message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {


                    return (
                        <li key={t.id} className={t.isDone ? 'completed_task' : ''}>
                            <button onClick={() => onClickDeleteHandler(t.id)}>x</button>
                            <input type="checkbox" onChange={(e) => onChangeIsDoneHandler(e, t.id)}
                                   checked={t.isDone}/>
                            <EditableSpan title={t.title} onChangeTitle={(title)=>onChangeTitleHandler(title,t.id)}/>
                        </li>)
                })}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active_button' : ''}
                        onClick={() => props.setFilterTask('all')}>All
                </button>
                <button className={filter === 'active' ? 'active_button' : ''}
                        onClick={() => props.setFilterTask('active')}>Active
                </button>
                <button className={filter === 'completed' ? 'active_button' : ''}
                        onClick={() => props.setFilterTask('completed')}>Completed
                </button>
            </div>
        </div>
    )
}


