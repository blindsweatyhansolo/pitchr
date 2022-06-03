async function newProjectFormHandler(event) {
    event.preventDefault();


    // Gather data from form
    const title = document.querySelector('input[name="project-title"]').value;
    const descriptionShort = document.querySelector('input[name="project-descriptionShort"]').value;
    const descriptionLong = document.querySelector('input[name="project-descriptionLong"]').value;
    const value = 0;


    const response = await fetch('api/projects', {
        method: 'POST',
        body: JSON.stringify({
            title,
            descriptionShort,
            descriptionLong,
            value
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

document.querySelector('.new-project-form').addEventListener('submit', newProjectFormHandler);