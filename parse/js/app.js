/*
    script for the index.html file
*/

<<<<<<< HEAD
// Michelles: Parse.initialize("HwGkNK09YRPy3ZajicPwpZMfX9vqCyc4ghFl2eh7", "14BQF3zAPvaOR1sh6aEzXX5Wk1LTnBFQopjr1Rbj");
//evin's ' Parse.initialize("rnPVLff4nz9OW4qu9GnkdD18TV4AzzxfLducfGQh", "x62CpPBIqQwvj2nW1eRSo50VWvUMxFSoyJG8NuVB");
Parse.initialize("kq3RcDcORXH1pEYMGnYHRus3BcGl88MIlOD1jfPf", "vJ5QfFElAa4wR5rhejg8y1bIYTNr4aVpeDrQh5LK");


$(function() {
    'use strict';
    //new Task class for parse
    var Task = Parse.Object.extend('Task');
    //new query that will return all tasks ordered by createdAt
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');
    tasksQuery.notEqualTo('done', true);

    //reference to the task list element
    var tasksList = $('#tasks-list');

    // reference to our rating
    var ratingElem = $('#rating');

    //reference to the error message alert
    var errorMessage = $('error-message');

    //current set of tasks
    var tasks = [];
=======

//OK to call this before the DOM is ready
Parse.initialize("u8fq2u4IqxKXBa9PuPjHB40HA39gqnxMq8lKJYkG", "R9zpakOjl4dXU3quSQ9tvTwwe0uQA2IJj3GdNKTt");

//when the document is ready...
$(function() {
    'use strict';

    //define a new Task object class with Parse
    var Task = Parse.Object.extend('Task');

    //define a query for querying Task objects
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    //varible to hold the current list of tasks
    var tasks = [];

    //reference to our error message alert
    var errorMessage = $('#error-message');

    //reference to the tasks list element
    var tasksList = $('#tasks-list');
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

<<<<<<< HEAD
    function showMessage(message) {
        message = message || 'Hello';
        alert(message);
    }

=======
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

<<<<<<< HEAD
    function fetchTasks() {
        showSpinner();
        tasksQuery.find().then(onData, displayError).always(hideSpinner);

    }

    function onData(result) {
        tasks = result;
        console.log(result);
=======
    function onData(results) {
        tasks = results;
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
<<<<<<< HEAD
        console.log(tasks);
        tasks.forEach(function(task) {
            var li = $(document.createElement('li'))
                .text(task.get('title'))
                .addClass(task.get('done') ? 'completed-task' : '')
                .appendTo(tasksList)
                .click(function() {
                    task.set('done' , !task.get('done'));
                    task.save().then(renderTasks, displayError);
                });

            $(document.createElement('span'))
                .raty({readOnly: true,
                    score: (task.get('rating') || 0),
                    hints: ['crap', 'awful', 'ok', 'nice', 'awesome']})
                .appendTo(li);
        });
    }

    //when the ser submits the new task form...
    $('#new-task-form').submit(function(evt) {
        evt.preventDefault();
        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.set('rating', ratingElem.raty('score'));
        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val('');
            ratingElem.raty('set', {});
        });

        return false;
    });

    // go and fetch tasks froms erver
    fetchTasks();

    ratingElem.raty();

    window.setInterval(fetchTasks, 3000);

});
=======
        tasks.forEach(function(task) {
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    $('#new-task-form').submit(function(evt) {
        //tell the browser not to do its default behavior
        evt.preventDefault();

        //find the input element in this form 
        //with a name attribute set to "title"
        var titleInput = $(this).find('[name="title"]');
        
        //get the current value
        var title = titleInput.val();

        //create a new Task and set the title
        var task = new Task();
        task.set('title', title);

        //save the new task to your Parse database
        //if save is successful, fetch the tasks again
        //otherwise display the error
        //regardless, clear the title input
        //so the user can enter the next new task
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val('');
            });

        //some browsers also require that we return false to
        //prevent the default behavior
        return false;
    }); //on new task form submit

    //fetch the tasks to kick everything off...
    fetchTasks();

    //refetch the tasks every so often
    //to get new tasks created by others
    window.setInterval(fetchTasks, 10000);
}); //on doc ready
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
