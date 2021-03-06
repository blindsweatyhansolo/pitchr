async function deleteProjectHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        console.log(response.statusText);
    }
};

document.querySelector('.delete-btn').addEventListener('click', deleteProjectHandler);