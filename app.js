const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const input = document.querySelector('#task');
const filter = document.querySelector('#filter');


loadAllEvents();


function loadAllEvents() {
    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', removeTask);


    clearButton.addEventListener('click', clearTasks);


    filter.addEventListener('keyup', filterTask);
}




function addTask(e) {
    e.preventDefault();

    if (input.value === '') {
        Swal.fire(
            'Where is the input?',
            'Did you really enter some information?',
            'question'
        )
    }
    else {

        const item = document.createElement('li');

        item.className = 'collection-item';

        item.appendChild(document.createTextNode(input.value));


        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-remove"></i>';

        item.appendChild(link);

        taskList.appendChild(item);

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your task has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    }
    console.log('Code Executed ')

}


function removeTask(e) {
    e.preventDefault();
    const target = e.target.parentElement.classList.contains('delete-item');
    if (target) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                e.target.parentElement.parentElement.remove();
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                )
            }
        })

    }

}



function clearTasks(e) {
    e.preventDefault();
    if (taskList.children.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No task is added yet!',
            footer: 'Try adding a new task first!'
        })
    }
    else {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Array.from(taskList.children).forEach(element => {
                    element.remove();
                });
                Swal.fire(
                    'Deleted!',
                    'All tasks has been deleted.',
                    'success'
                )
            }
        })

    }
}



function filterTask(e) {
    e.preventDefault();
    const text = e.target.value.toLowerCase();
    const allTasks = document.querySelectorAll('.collection-item');

    Array.from(allTasks).forEach(element => {
        if (element.firstChild.textContent.toLowerCase().indexOf(text) != -1) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
}