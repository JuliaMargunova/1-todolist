import React, {ChangeEvent, useState} from "react";
import Button from "@mui/material/Button";

type AddItemFormProps = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormProps) {
    const [error, setError] = useState<string>("");
    const [newTitle, setNewTitle] = useState<string>('')

    function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        setError('')
        if (e.currentTarget.value.trim() !== '') {
            setNewTitle(e.currentTarget.value.trim())
        }
    }

    function onClickAddTaskHandler() {
        addTask()
    }

    function addTask() {
        if (newTitle.trim() !== '') {
            props.addItem(newTitle)
            setNewTitle('')
        } else {
            setError("Title is required");
        }
    }

    function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <input className={error && 'error_input'} value={newTitle} onChange={onChangeTitle}
                   onKeyDown={onKeyDownHandler}/>
            <Button variant={"contained"} onClick={onClickAddTaskHandler}>+</Button>
            {error && <div className={'error_message'}>{error}</div>}
        </div>
    )
}