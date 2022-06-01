async function newProjectFormHandler(event) {
    event.preventDefault();

    console.log('CLICK!');

    // Gather data from form
    const title = document.querySelector('input[name="project-title"]').value;
    const description = document.querySelector('input[name="project-description"]').value;
    const value = 0;


    const response = await fetch('api/projects', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            value
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

document.querySelector('.new-project-form').addEventListener('submit', newProjectFormHandler);