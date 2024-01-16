const React = require('react')

function Show(props){
    return(
        <div>
            <h1>{props.todo.title}</h1>
            <a href='/todos'>Go back to Index Page</a>
            <p>
                The {props.todo.title} is {props.todo.description} and 
                {props.todo.completed? 'it is completed.': 'it is still on your To Do List.'}
            </p>
              <form action={`/todos/${props.todo._id}?_method=DELETE`} method="POST">
                <input type="submit" value={`Delete this ${props.todo.title}`}/>
            </form>
            <div>
                <a href={`/todos/${props.todo._id}/edit`}><button>{`Edit this To Do: ${props.todo.title}`}</button></a>
            </div>
        </div>
    )
}

module.exports = Show