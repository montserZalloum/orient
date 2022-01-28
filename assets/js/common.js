$(document).ready(function() {
    $('.contact-form').submit(function(e) {
        
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val()
        if (email != '' && message != '') {
            e.preventDefault();
            $('#submit').addClass('no-click')
            $.ajax({
                url: '/contact-us',
                method: 'POST',
                data: {
                    name: name,
                    email: email,
                    message: message,
                }
            }).done(function (data) {
                $('#submit').removeClass('no-click')
                showAlert()
            }).fail(function (err) {
                // showAlert(false)
            });
            
        }

    });
})

function showAlert() {
    $('.alert').addClass('active');
    setTimeout(function () {
        $('.alert').removeClass('active');
    }, 2500)
}