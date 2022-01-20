$(document).ready(function () {

    $('.menu-btn').click(function () {
        $(this).toggleClass('active');
        $('.side-navbar').toggleClass('shrinked')
        $('.content-inner').toggleClass('active')
    });

    $('[remove]').click(function () {
        var id = $(this).attr('remove');
        var type = $(this).attr('kind');
        $('[form=' + type + ']')
        remove(type, id)
    });
    $('[remove-validation]').click(function () {
        var id = $(this).parents('tr').attr('id');
        $('[remove]').attr('remove', id)
    });


    function remove(type, id) {
        var url = '';
        data = {
            'id': id
        }
        switch (type) {
            case 'branch':
                url = '/remove-branch';
                break;
            case 'offer':
                url = '/remove-offer';
                break;
        }

        $.ajax({
            url: url,
            method: 'DELETE',
            data: data
        }).done(function (data) {
            console.log('DONE::', data);
            location.reload();
        }).fail(function (err) {
            showAlert(false)
        });
    }

    function showAlert(status) {
        var selector = '.alert.alert-success';
        status ? selector = '.alert.alert-success' : selector = '.alert.alert-danger'
        $(selector).addClass('active');
        setTimeout(function () {
            $(selector).removeClass('active');
        }, 1500)
    }



})


function add(type) {
    var url = '';
    var data = {};
    var validate = true;
    var filedCheck = {
        hasImage: false,
        image: null,
        src: null
    }
    loading(true)
    switch (type) {
        case 'branch':
            url = '/add-branch';
            data = {
                'name': $('#branchName').val(),
                'phoneNumber': $('#branchNumber').val()
            }
            break;
        case 'offer':
            url = '/add-offer';
            var offerImage = $('#offer_image').val()
            if (offerImage)
                filedCheck.hasImage = true;
            filedCheck.image = $('#offer_image')
            data = {
                'title': $('#title').val(),
                'fromDate': $('#fromdate').val(),
                'toDate': $('#todate').val(),
                'promoted': $('#promoted').is(':checked'),
                'phoneNumber': $('#branchNumber').val()
            }

            var d1 = Date.parse($('#fromdate').val())
            var d2 = Date.parse($('#todate').val())
            if (d2 < d1)
                validate = false
            break;
        case 'contactus':
            
            var storeImage = $('#store_logo').val()
            if (storeImage)
                filedCheck.hasImage = true
            filedCheck.image = $('#store_logo')
            var id = $('#contact_id').val();
            if (id)
                url = '/update-contactus/' + id;
            else
                url = '/update-contactus';
            data = {
                'title': $('#title').val(),
                'slogan': $('#slogan').val(),
                'map': $('#map').val(),
                'direction': $('#direction').val(),
                'phoneNumber': $('#contact_number').val(),
                'website': $('#website').val(),
                'facebook': $('#facebook').val(),
                'instagram': $('#instagram').val(),
                'whatsapp': $('#whatsapp').val()
            }
            break;
    }

    if (!validate) {
        showAlert(false)
        return false
    }

    if (filedCheck.hasImage) {
        file = $(filedCheck.image).get(0).files[0];
        var form = new FormData();

        form.append("file", file, file.name);
        var settings = {
            "url": "/image-upload",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            var src = JSON.parse(response).path;
            data.image = src
            // $('[form='+type+']').find('[append-image]').attr('src',src)
            callApi()
        });
    } else {
        callApi()
    }

    function callApi() {
        loading(false)
        $.ajax({
            url: url,
            method: 'POST',
            data: data
        }).done(function (data) {
            console.log('DONE::', data);
            location.reload();
        }).fail(function (err) {
            showAlert(false)
        });
    }
}

function showAlert(status) {
    var selector = '.alert.alert-success';
    status ? selector = '.alert.alert-success' : selector = '.alert.alert-danger'
    $(selector).addClass('active');
    setTimeout(function () {
        $(selector).removeClass('active');
    }, 1500)
}

function loading(status) {
    if (status)
        $('.alert.alert-info').addClass('active');
    else
        $('.alert.alert-info').removeClass('active');
}

function logout() {
 
	// To invalidate a basic auth login:
	// 
	// 	1. Call this logout function.
	//	2. It makes a GET request to an URL with false Basic Auth credentials
	//	3. The URL returns a 401 Unauthorized
	// 	4. Forward to some "you-are-logged-out"-page
	// 	5. Done, the Basic Auth header is invalid now
 
	$.ajax({
            type: "GET",
            url: "/",
            async: false,
            username: "logmeout",
            password: "123456",
            headers: { "Authorization": "Basic xxx" }
	})
	.done(function(){
	    // If we don't get an error, we actually got an error as we expect an 401!
	})
	.fail(function(){
	    // We expect to get an 401 Unauthorized error! In this case we are successfully 
            // logged out and we redirect the user.
	    window.location = "/";
    });
 
    return false;
}