const React = require('react')

function New (props) {
    return(
        <div>
            <h1>New To Do Page</h1>
            <a href='/todos'>Go Back to Index Page</a>
            <form action="/todos" method="POST">
                Title: <input type="text" name="title" /><br/>
                Description: <input type="text" name="description" /><br/>
                Completed?: <input type="checkbox" name="completed" /><br/>
                <input type="submit" value="Create To Do" />
            </form>
        </div>
    )
}

module.exports = New