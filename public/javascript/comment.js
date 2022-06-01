// From Single-Project page, create logic for commentFormHandler

async function commentFormHandler(event) {
    event.preventDefault();

    // Gather new comment text value from form
    const text = document.querySelector('textarea[name="comment-body"]').value.trim();
    // Grab Post ID value from URL string
    const projectId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // IF text field has a value, perform POST request [/comments] using the stringified gathered values
    if (text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                projectId,
                text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // On success use document.location.reload() to reload page to show new comment data
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);