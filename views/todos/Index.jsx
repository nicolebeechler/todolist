const React = require('react')

function Index (props) {

    console.log("props.todos:", props.todos);

    return (
        <div>
            <h1>To Do List Index Page</h1>
            <a href="/todos/new">Create A New To Do</a>
            <ul>
                {
                    props.todos.map((todo) => {
                        return (
                            <li key={todo._id}>
                                <a href={`/todos/${todo._id}`}>{todo.title}</a>  {todo.description}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

module.exports = Index