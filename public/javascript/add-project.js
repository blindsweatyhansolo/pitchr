const projectsHolder = document.getElementById('projects-holder')

async function getAndRenderProjects() {
    const projects = await fetch('api/projects')
    const pJects = await projects.json()
    projectsHolder.innerHTML = ""
    console.log(pJects);
    if (pJects.length <= 0) {
        // do something here
    }
    let projString = ""
    for (let i = 0; i < pJects.length; i++) {
        const current = pJects[i];
        projString+=generateProjectArticle(current)
    }
    projectsHolder.innerHTML = projString;
}

function generateProjectArticle(project) {
    return `<article class="project card shadow-sm my-2">
    <a href="/project/${project.id}">
        <div class="card-header">
            <h4 class="card-title">${project.title}</h4>
        </div>
    </a>
    <div class="card-body p-4">
        <h6 class="card-subtitle mb-2 text-muted">
            <i class="bi bi-person-lines-fill"></i>${project.user.username}
        </h6>
        <p class="card-text p-3">
            ${project.description}
        </p>
    </div>
    <div class="card-footer text-muted px-3 d-flex justify-content-between">
        <p><i class="bi bi-calendar3"></i>${(new Date(project.createdAt)).toLocaleString()}</p>
        <p><i class="bi bi-chat-right-text"></i>${project.comments.length}</p>
        <p><i class="bi bi-hand-thumbs-up"></i>${project.voteCount}</p>
    </div>

</article>
<div>
        <a href="/favorites/edit-project/${project.id}" class="btn col-12">
          EDIT
        </a>
      </div>`
}

async function newProjectFormHandler(event) {
    event.preventDefault();

    console.log('click');

    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()

    // Gather data from form
    const title = document.querySelector('input[name="project-title"]').value;
    const descriptionShort = document.querySelector('input[name="project-descriptionShort"]').value;
    const descriptionLong = document.querySelector('textarea[name="project-descriptionLong"]').value;
    // const value = 0;


    const response = await fetch('api/projects', {
        method: 'POST',
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
        getAndRenderProjects();
    } else {
        console.log(response.statusText);
    }

};

document.querySelector('.new-project-form').addEventListener('submit', newProjectFormHandler);

getAndRenderProjects();
