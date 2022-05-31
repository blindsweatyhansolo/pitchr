// logic editing project
// ON FAVORITES PAGE, CLICKING EDIT BUTTON ON PROJECT
// DIRECTS YOU TO EDIT PROJECT PAGE
// THIS SCRIPT HANDLES PUT ROUTE FOR PROJECT

async function editProjectHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="edit-project-title"]').value;
    const description = document.querySelector('input[name="project-description]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/favorites');
    } else {
        console.log(response.statusText);
    }
};

document.querySelector('.edit-project-form').addEventListener('submit', editProjectHandler);