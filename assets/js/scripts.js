$('.menu-btn').click(function () {
    $(this).toggleClass('active');
    $('.side-navbar').toggleClass('shrinked')
    $('.content-inner').toggleClass('active')
});


$('form[type]').submit(function (e) {
    var type = $(this).attr('type')
    if (!add(type)) {
        e.preventDefault()
    }
})



$('[file]').on('change', function(){
    var id = $(this).attr('id');
    if(document.getElementById(id).files && document.getElementById(id).files[0]){
        file = document.getElementById(id).files[0]
        var form = new FormData();
        form.append(id, file, file.name);
        var settings = {
            "url": "/image-upload?id="+id,
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };
        
        $.ajax(settings).done(function (response) {
            var data = JSON.parse(response)
            $('[append-image="'+id+'"] img').attr('src','/uploads/'+ data.fileName)
        });
    }
})

function add(type) {
    
    var url = '';
    var data = {};
    var validate = true;
    var hasImage = false;
    var options = {}
    loading(true)
    $('form[type="'+type+'"] [required]:not([type="file"])').each(function () {
        if ($(this).val() == '')
            validate = false
    })
    
    switch (type) {
        case 'aboutus':
            url = '/admin/about-us';
            data = {
                'whoweare-en': $('#whoweare').val(),
                'ourgoals-en': $('#ourgoals').val(),
                'ourmission-en': $('#ourmission').val(),
                'whoweare-ar': $('#whoweare-ar').val(),
                'ourgoals-ar': $('#ourgoals-ar').val(),
                'ourmission-ar': $('#ourmission-ar').val(),
            }
            break;
        case 'resources':
            url = '/admin/resources';
            data = {
                'banner-text-en': $('#banner-text-en').val(),
                'banner-text-ar': $('#banner-text-ar').val(),
                'our-projects-text-en': $('#our-projects-text-en').val(),
                'our-projects-text-ar': $('#our-projects-text-ar').val(),
                'footer-text-en': $('#footer-text-en').val(),
                'footer-text-ar': $('#footer-text-ar').val(),
                'mobile': $('#mobile').val(),
                'address-en': $('#address-en').val(),
                'address-ar': $('#address-ar').val(),
                'email': $('#email').val(),
                'facebook': $('#facebook').val(),
                'instagram': $('#instagram').val(),
                'linkedin': $('#linkedin').val(),
            }
            break;
        // product
        case 'new-product':
            url = '/add-product';
            data = {
                'id': Math.random().toString(36).slice(2),
                'name-en': $('#name').val(),
                'name-ar': $('#name-ar').val(),
                'image': $('#image').val(),
                'description-en': $('#description').val(),
                'description-ar': $('#description-ar').val(),
                'full-description-en': $('#full-description').val(),
                'full-description-ar': $('#full-description-ar').val(),
                'exportable': $('#exportable').is(':checked')
            }
            debugger;
            options.refresh = true
            break;
        case 'edit-product':
            url = '/edit-product';
            data = { 
                'id': $('#edit-id').val(),
                'name-en': $('#edit-name').val(),
                'name-ar': $('#edit-name-ar').val(),
                'description-en': $('#edit-description').val(),
                'description-ar': $('#edit-description-ar').val(),
                'full-description-en': $('#edit-full-description').val(),
                'full-description-ar': $('#edit-full-description-ar').val(),
                'exportable': $('#edit-exportable').is(':checked')
            }
            options.refresh = true
            break;
        // project
        case 'new-project':
            url = '/add-project';
            data = {
                'id': Math.random().toString(36).slice(2),
                'name-en': $('#name').val(),
                'name-ar': $('#name-ar').val(),
                'image': $('#image').val(),
                'location-en': $('#location').val(),
                'location-ar': $('#location-ar').val(),
                'exportable': $('#exportable').is(':checked')
            }
            options.refresh = true
            break;
        case 'edit-project':
            url = '/edit-project';
            data = { 
                'id': $('#edit-id').val(),
                'name-en': $('#edit-name').val(),
                'name-ar': $('#edit-name-ar').val(),
                'location-en': $('#edit-location').val(),
                'location-ar': $('#edit-location-ar').val(),
                'exportable': $('#edit-exportable').is(':checked')
            }
            options.refresh = true
            break;
    }

    $('form[type="'+type+'"] [required-img][type="file"]').each(function () {
        hasImage = true;
        var id = $(this).attr('id')
        var val = $('[append-image="'+id+'"] img').attr('src')
        if (val == '/uploads/') {
            $(this).attr('required',true)
            validate = false
        } else {
            $(this).attr('required',false)
            data[id] = val.replace('/uploads/','');
        }
    });
                
    if (!validate) {
        loading(false);
        showAlert(false)
        return false
    }
    
    callApi(url,data,options)
    return false
}


function callApi(url,data,options) {
    loading(false)
    $.ajax({
        url: url,
        method: 'POST',
        data: data
    }).done(function (data) {
        showAlert(true)
        if (options.hasOwnProperty('refresh'))
            window.location.reload()
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

function loading(status) {
    if (status)
        $('.alert.alert-info').addClass('active');
    else
        $('.alert.alert-info').removeClass('active');
}

function logout() {
    var out = window.location.href.replace(/:\/\//, '://log:out@');
    jQuery.get(out).error(function() {
        window.location = '/';
    });
    window.location = '/';
}

$('[remove-id]').click(function() {
    id = $(this).attr('remove-id');
    type = $(this).attr('data-type');
    switch (type) {
        case 'product':
            $('.modal [data-type="'+type+'"]').attr('remove',id)
            break;
        case 'project':
            $('.modal [data-type="'+type+'"]').attr('remove',id)
            break;
    }
})

$('.edit-btn').click(function () {
    id = $(this).attr('edit-id');
    type = $(this).attr('data-type');
    var rootForm = $('.modal form[type="'+type+'"]')
    var elRoot = $(this).parents('[root-id="'+id+'"]');
    switch (type) {
        case 'edit-product':
            $(rootForm).find('#edit-id').val(id)
            $(rootForm).find('#edit-name').val($(elRoot).find('[prod-name]').html())
            $(rootForm).find('#edit-name-ar').val($(elRoot).find('[prod-name-ar]').html())
            $(rootForm).find('#edit-description').val($(elRoot).find('[prod-desc]').html())
            $(rootForm).find('#edit-description-ar').val($(elRoot).find('[prod-desc-ar]').html())
            $(rootForm).find('#edit-full-description').val($(elRoot).find('[prod-full-desc]').html())
            $(rootForm).find('#edit-full-description-ar').val($(elRoot).find('[prod-full-desc-ar]').html())
            $(rootForm).find('[append-image] img').attr('src',$(elRoot).find('[prod-img]').attr('src'))
            $(rootForm).find('#edit-exportable').prop('checked',($(elRoot).find('[prod-exportable]').html() == 'true' ? true : false ))
            break;
        case 'edit-project':
            $(rootForm).find('#edit-id').val(id)
            $(rootForm).find('#edit-name').val($(elRoot).find('[prod-name]').html())
            $(rootForm).find('#edit-name-ar').val($(elRoot).find('[prod-name-ar]').html())
            $(rootForm).find('#edit-location').val($(elRoot).find('[prod-location]').html())
            $(rootForm).find('#edit-location-ar').val($(elRoot).find('[prod-location-ar]').html())
            $(rootForm).find('[append-image] img').attr('src',$(elRoot).find('[prod-img]').attr('src'))
            $(rootForm).find('#edit-exportable').prop('checked',($(elRoot).find('[prod-exportable]').html() == 'true' ? true : false ))
            break;
    }
})
$('.show-btn').click(function () {
    id = $(this).attr('edit-id');
    type = $(this).attr('data-type');
    var rootForm = $('.modal [data-type="'+type+'"]')
    var elRoot = $(this).parents('[root-id="'+id+'"]');
    switch (type) {
        case 'contactus':
            $(rootForm).find('[user-name]').html($(elRoot).find('[user-name]').text())
            $(rootForm).find('[user-email]').html($(elRoot).find('[user-email]').text())
            $(rootForm).find('[user-message]').html($(elRoot).find('[user-message]').text())
            break;
    }
})

$('[remove]').click(function(){
    id = $(this).attr('remove');
    type = $(this).attr('data-type');
    var url = ''
    switch (type) {
        case 'product':
            url = '/remove-product'
            break;
        case 'project':
            url = '/remove-project'
            break;
    }

    $.ajax({
        url: url,
        method: 'POST',
        data: {id: id}
    }).done(function (data) {
        showAlert(true)
        // setTimeout(function(){
            location.reload()
        // },1000)
    }).fail(function (err) {
        showAlert(false)
    });
})