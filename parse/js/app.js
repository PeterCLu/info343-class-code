/*
    script for the index.html file
*/

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

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function showMessage(message) {
        message = message || 'Hello';
        alert(message);
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find().then(onData, displayError).always(hideSpinner);

    }

    function onData(result) {
        tasks = result;
        console.log(result);
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
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