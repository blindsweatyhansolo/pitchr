// logic editing project

async function editProjectHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="edit-project-title"]').value;
    const descriptionShort = document.querySelector('input[name="project-descriptionShort"]').value;
    const descriptionLong = document.querySelector('input[name="project-descriptionLong"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            descriptionShort,
            descriptionLong,
            // value
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        console.log(response.statusText);
    }
};

document.querySelector('.edit-project-form').addEventListener('submit', editProjectHandler);