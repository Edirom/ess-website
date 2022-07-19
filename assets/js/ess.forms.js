// Javascript for disabling inputs of concurrent workshops
function conflict(kursElem) {

    // get the slot labels (e.g. 'Mi1', 'Mi2') for the current input
    let curSlots = $(kursElem).attr('data-slots').split(' ');

    // if checked, disable all concurrent classes
    if (kursElem.checked) {
        // iterate over the current slot labels and simply
        // disable all inputs with the same label
        $(curSlots).each(function(a,b){
            $('input[data-slots~=' + b + ']').attr('disabled',
                true);
        })
        // since the above loop disables every match,
        // re-enable here for current input
        $(kursElem).attr('disabled', false);
    }

        // otherwise re-enable matching inputs
        // this is a bit complicated, since we need to look out
    // for cross matches
    else {
        // iterate over the current slot labels
        $(curSlots).each(function(a,slot){
            // ... and iterate over all matching inputs
            $('input[disabled][data-slots~=' + slot + ']').each(function(b,curInput) {
                let curInputSlots =
                        $(curInput).attr('data-slots').split(' '),
                    counter = 0;
                // ... and its slot labels to check whether there
                // is any other checked input with the same label
                $(curInputSlots).each(function(x,y) {
                    counter+= $('input:checked[data-slots~=' + y +
                        ']').length;
                })
                if(counter === 0) {
                    $(curInput).attr('disabled', false);
                }
            })
        })
    }
}

//adaption to https://stackoverflow.com/questions/29397155/javascript-calculate-total-price-of-items
//by Dennis
function getTotal(){
    let total = 0;
    if(document.getElementById("studi").checked === true) {
        document.getElementById('gebuehr').value = "0";
        document.getElementById('gebuehrSpan').innerHTML = "0";
    } else {
        if($("#basket").find('.form-check-input').length === 0) {
            document.getElementById('gebuehr').value = "0";
            document.getElementById('gebuehrSpan').innerHTML = "0";
        } else{
            $("#basket").find('.form-check-input').each(function(i){
                total += parseInt($(this).attr('costs'));
                document.getElementById('gebuehr').value = total;
                document.getElementById('gebuehrSpan').innerHTML = total;
            });
        }
    }
}

function sortList() {
    let list, i, switching, b, shouldSwitch;
    list = document.querySelector(".kurse");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("div");
        // Loop through all list-items:
        for (i = 0; i < (b.length - 1); i++) {
            // start by saying there should be no switching:
            shouldSwitch = false;
            /* check if the next item should
            switch place with the current item: */
            if (b[i].querySelector(".form-check-label").innerText > b[i + 1].querySelector(".form-check-label").innerText) {
                /* if next item is alphabetically
                lower than current item, mark as a switch
                and break the loop: */
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark the switch as done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}

$(".kurse").on('click', ".form-check-input", function() {
    $(this.parentNode).appendTo("#basket");
    getTotal();
});

$("#basket").on('click', ".form-check-input", function() {
    $(this.parentNode).appendTo(".kurse");
    getTotal();
});

$('.kurse input').on('change', function() {
    conflict(this);
    sortList();
});

$('#studi').on('change', function() {
    getTotal();
});

// Example starter JavaScript from https://getbootstrap.com/docs/4.6/components/forms/#custom-styles
// for disabling form submissions if there are invalid fields
window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    let validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false ||
                document.getElementById('g-recaptcha-response').value.length === 0) {
                // add an extra warning if recaptcha is not solved
                if(document.getElementById('g-recaptcha-response').value.length===0) {
                    $('.g-recaptcha span.invalid-feedback').remove();
                    $('.g-recaptcha').append('<span class="invalid-feedback">Bitte das Captcha ausfüllen</span>');
                    $('.g-recaptcha span.invalid-feedback').show();
                    $('.g-recaptcha').css('border', '1px solid red');
                }
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}, false);
