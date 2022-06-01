// LOGIC FOR VOTING ON PROJECT
async function upvoteClickHandler(event) {
    event.preventDefault();

    // grab project id from url string
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // console.log('CLICK!', id);

    // PUT request using id
    const response = await fetch('/api/projects/upvote', {
        method: 'PUT',
        body: JSON.stringify({
            projectId: id
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        console.log(response.statusText);
    }
};

document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);