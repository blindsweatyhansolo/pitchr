// LOGIC FOR UPDATING USER INFO FROM EDIT-PROFILE PAGE
async function updateUserFormHandler(event) {
    event.preventDefault();

    const id = document.getElementById("hiddenId").value;
    const github = document.querySelector('input[id="user-github"]').value;
    const email = document.querySelector('input[id="user-email"]').value;
    const password = document.querySelector('input[id="user-password"]').value;


    console.log(id);

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            github,
            email,
            password
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

document.querySelector('.update-user-form').addEventListener('submit', updateUserFormHandler);