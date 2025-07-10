import react, { useEffect, useState } from "react";

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [userInput, setUserInput] = useState("");

    const getFetch = () => {
        fetch('https://playground.4geeks.com/todo/users/rudy')
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                // Read the response as JSON
                return response.json();
            })
            .then(responseAsJson => {
                // Do stuff with the JSONified response
                console.log(responseAsJson.todos);
                setTasks(responseAsJson.todos);

            })
            .catch(error => {
                console.log('Looks like there was a problem: \n', error);
            });
    };

    useEffect(() => {
        getFetch()
    }, []
    );

    const saveTask = () => {
        const data = {
            label: userInput,
            is_done: false,
        }
        fetch("https://playground.4geeks.com/todo/todos/rudy", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(result => {
                if (!result.ok) {
                    throw Error(result.statusText);
                }
                return result.json();
            })

            .then(newTask => {
                console.log('succes: ', newTask);
                setTasks([...tasks, newTask]);
                setUserInput("");
            })
            .catch(error => console.error(error))
    }


    const deleteTask = () => {
        fetch('https://playground.4geeks.com/todo/users/rudy')
            .then(res => res.json())
            .then(data => {
                const todos = data.todos;
                todos.forEach(todo => {
                    fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
                        method: 'DELETE'
                    });
                });
                setTasks([]); // Clear UI immediately
            });
    };


    return (
        <div className="Text p-3">
            <input
                type="text"
                value={userInput}
                id="input"
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") saveTask();
                }}
                placeholder="What needs to be done?"
                className="form-control mb-3"
            />
            <ul className="list-group list-group-flush">
                {tasks.map((task, index) => (
                    <li key={index} className="list-group-item">
                        {task.label}
                    </li>
                ))}
            </ul>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary me-2" onClick={saveTask}>
                    Save
                </button>
                <button className="btn btn-danger" onClick={deleteTask}>
                    Delete
                </button>
            </div>

        </div>
    );
};


export default Todo;