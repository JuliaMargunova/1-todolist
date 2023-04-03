import React from "react";


type PropsType = {
    track1: string,
    track2?: string | number,
    tasks: Array<TaskType>
   /* topCars: Array<CarType>*/
}
/*type CarType = {
    manufacturer: string
    model: string
}*/

type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    return (
        <div className="App">
            <div>
                <h3>{props.track1} fff {props.track2}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((el) => <li><input type="checkbox" checked={true}/>
                        <span>{el.isDone} {el.title}</span></li>)}
                </ul>

                <div>
                  {/*  <table>
                        {props.topCars.map((item, index) =>{return <tr key={index + 1}>
                                <td>{item.manufacturer}</td>
                                <td>{item.model}</td>
                            </tr>}
                        )}
                    </table>*/}
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}