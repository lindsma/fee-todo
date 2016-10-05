// using:  objects, arrays, iterations, functions, modules,  and the DOM (using jquery to manipulate it)

// Create a TODO item when the user submits the new TODO form (the box that says "What needs to be done?" in the mockup below)

// Clicking on a todo item's text allows the user to edit the item inline (see image #2)

// Hovering over a todo shows the red "X", and clicking on that "X" deletes the item

// (If you want, you could add a confirmation popup to this action using confirm(...))

// The incomplete item count should always be displayed in the bottom left corner (see mockup)

// Clicking on "Active" at the bottom nav results in only showing incomplete items

// Clicking on "Completed" at the bottom results in only showing complete items

// Clicking on "All" at the bottom results in showing all items, regardless of status

// Clicking on the circle to the left of an item toggles whether it is complete or not

// Clicking "Clear completed" removes any todo item that is marked complete (delete from the UI)

$(document).ready(function() {

    var todoObject = {


        createElements: function(itemInput) {

          console.log(itemInput);

            var listItem = $('<li>').attr('class', itemInput);
            var article = $('<article>').attr('class', 'article').appendTo(listItem);
            var checkBtn = $('<button>').attr('class', 'check').appendTo(article);
            var todoInput = $('<p>').attr('class', itemInput).html(itemInput).appendTo(checkBtn);
            var editTodo = $('<input>').attr({
                'type': 'edit-todo',
                // 'value': itemInput
            }).appendTo(todoInput);
            var closeBtn = $('<button>').attr('class', 'delete').html('X').appendTo(editTodo);

            $(listItem).appendTo('.items');

            console.log('bye');

        },


        getInput: function() {

          var todoArray = [];

            $('form').submit(function(event) {

                event.preventDefault();
                var itemInput = $('.new-todo').val();
                $('.new-todo').val('');

                todoArray.push(itemInput);
                todoObject.createElements(itemInput);

            });

        }


        //     editInput: function() {
        //
        //     $('ul').on('click', '.check', function() {
        //
        //       console.log('hi');
        //
        //
        //     });
        //
        //
        //
        // }


    };

    todoObject.getInput();

});
