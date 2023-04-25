import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (title: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = ({title, ...props}) => {
    const [onInput, setOninput] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState('')
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const activateViewMode = () => {
        setOninput(false)
        props.onChangeTitle(newTitle)
    }
    const activateEditMode = () => {
        setOninput(true)
        setNewTitle(title)
    }

    return (
        <>  {onInput
            ? <input autoFocus onBlur={activateViewMode} onChange={onChangeTitleHandler} value={newTitle}
                     type={"text"}/>
            : <span onDoubleClick={activateEditMode}>{title}</span>}

        </>
    )


}