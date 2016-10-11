$(document).ready(function() {

    var todoObject = {
        todosAll: [],

        // create HTML elements
        createElements: function(itemInput) {
            var listItem = $('<li>').attr('class', itemInput);
            var article = $('<article>').attr('class', 'article incomplete').appendTo(listItem);
            var checkBtn = $('<button>').attr('class', 'check').appendTo(article);
            var todoInput = $('<p>').attr('class', 'incomplete ' + itemInput).text(itemInput).appendTo(article);
            var editTodo = $('<input>').attr({
                'class': 'edit-todo',
                'type': 'text',
                'value': itemInput
            }).appendTo(article);
            var closeBtn = $('<button>').attr({
                'class': 'delete',
                'id': itemInput
            }).html('X').appendTo(article);
            $(listItem).appendTo('.items');
            todoObject.updateFooter();
        },
        // get input from form
        getInput: function() {
            $('form').submit(function(event) {
                event.preventDefault();
                var itemInput = $('.new-todo').val();
                $('.new-todo').val('');
                todoObject.todosAll.push(itemInput);
                todoObject.createElements(itemInput);
            });
        },
        // initiate event handlers and call getInput
        init: function() {
            // delete todo item
            $('.items').on('click', '.delete', function(event) {
                var selectedInput = $(this).attr('id');
                $(this).parents('.completed').slideUp(function() {
                    $(this).remove();
                    var deleteInput = todoObject.todosAll.indexOf(selectedInput);
                    todoObject.todosAll.splice(deleteInput, 1);
                });
                todoObject.updateFooter();
            });
            // toggle complete button
            $('.items').on('click', '.check', function(event) {
                var selectedInput = $(this).siblings('p').html();
                $(this).toggleClass('complete').html('&#10003');
                var listP = $(this).siblings('p');
                $(listP).toggleClass('complete').toggleClass('incomplete');
                $(listP).parents('article').toggleClass('completed').toggleClass('incomplete');
                $(listP).siblings('p').toggleClass('complete');
                todoObject.updateFooter();
            });
            // 'show-all' button
            $('.show-all').click(function() {
                $('article.completed').show();
                $('article.incomplete').show();
            });
            // 'show active' button
            $('.show-active').click(function() {
                $('article.completed').hide();
                $('article.incomplete').show();
            });
            // 'show completed' button
            $('.show-completed').click(function() {
                $('article.incomplete').hide();
                $('article.completed').show();
            });
            // 'clear completed' button
            $('.clear').click(function() {
                $('.completed').remove();
            });
            // edit todo item
            $('.items').on('click', 'p', function() {
                var self = this;
                $(self).hide();
                var selectedInput = $(this).text();
                $(this).siblings('.edit-todo').show();
                $(this).parents('article').toggleClass('editing');
                $('p.' + selectedInput).focus();
                $(this).siblings('.delete').hide();

                $('.edit-todo').keyup(function(event) {
                    var newValue = this.value;
                    $(self).html(newValue);
                    if (event.keyCode == 13) {
                        $(self).show();
                        $(self).siblings('.edit-todo').hide();
                        $(self).siblings('.delete').show();
                    }
                });
            });
            todoObject.getInput();
        },
        // update values for 'items left'
        updateFooter: function() {
            var incompleteItems = $('article.incomplete').length;
            console.log(incompleteItems);
            $('.incomplete-items').text('');
            $('.incomplete-items').text(incompleteItems);
        },
    };
    todoObject.init();
});
