// LOGIC FOR DELETING USER 
async function deleteUserHandler(event) {
    event.preventDefault();

    const id = document.getElementById('hiddenId').value;

    const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        console.log(response.statusText);
    }
};

document.querySelector('.delete-btn').addEventListener('click', deleteUserHandler);