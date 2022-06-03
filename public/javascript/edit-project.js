// logic editing project

async function editProjectHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="edit-project-title"]').value;
    const descriptionShort = document.querySelector('textarea[name="edit-project-descriptionShort"]').value;
    const descriptionLong = document.querySelector('textarea[name="edit-project-descriptionLong"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    console.log('click/submit', title, descriptionShort, descriptionLong, id);

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