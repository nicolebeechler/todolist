const React = require('react')

function Edit (props) {
    const { title, _id, description, completed } = props.todo
    return(
        <div>
            <h1>{title} Edit Page</h1>
            <a href='/todos'>Go back to Index Page</a>
            <form action={`/todos/${_id}?_method=PUT`} method="POST">
                Title: <input type="text" title="title" defaultValue={title} /><br/>
                Description: <input type="text" name="description" defaultValue={description}/><br/>
                Completed?: {completed ? <input type="checkbox" name="completed" defaultChecked />: <input type='checkbox' name="completed"/>}<br/>
                <input type="submit" value="Update To Do" />
            </form>
        </div>
    )
}

module.exports = Edit