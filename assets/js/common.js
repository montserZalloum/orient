$(document).ready(function() {
    $('.contact-form').submit(function(e) {
        
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val()
        var mobile = $('#mobile').val()
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
                    mobile: mobile
                }
            }).done(function (data) {
                showAlert()

                sendMail()

            }).fail(function (err) {
                // showAlert(false)
            });
            
        }

    });


    $('.burger-icon').click(function(){
        $('.mobile-menu').addClass('active')
        $('body').addClass('overflow-hidden')
    })
    $('[close-mobile-nav]').click(function(){
        $('.mobile-menu').removeClass('active')
        $('body').removeClass('overflow-hidden')
    })

    // switch lang link
    var switchToLang = $('[switch-lang]').attr('href')
    $('[switch-lang]').attr('href',window.location.origin + window.location.pathname.replace('/'+lang,switchToLang) )
    if (window.location.pathname == '/') {
        $('[switch-lang]').attr('href','/'+$('[switch-lang]').attr('switch-lang'))
    }
})

function showAlert() {
    $('.alert').addClass('active');
    setTimeout(function () {
        $('.alert').removeClass('active');
    }, 2500)
}

function sendMail(){
    //update this with your $form selector
    var data = {
        "access_token": "u59uyfjnhoplptq516non54z"
    };

    function onSuccess() {
        // remove this to avoid redirect
        // window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
    }

    function onError(error) {
        // remove this to avoid redirect
        // window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
    }

    // var sendButton = $("#" + form_id + " [name='send']");

    function send() {
        // sendButton.val('Sending…');
        // sendButton.prop('disabled',true);

        var subject = 'Contact Us Form';
        var message = $('#message').val();
        data['subject'] = subject;
        data['text'] = message;

        $.post('https://postmail.invotes.com/send',
            data,
            onSuccess
        ).fail(onError);

        return false;
    }

    send()
}