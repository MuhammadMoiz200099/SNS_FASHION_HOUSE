(function() {

    var allitems = JSON.parse(localStorage.getItem("currentUser")) || [];

    var email = allitems.email + '';

    var userName = email.substring(0, email.lastIndexOf("@"));

    userName = userName.replace(/[0-9]/g, '');

    if(email === "") {
        $('#user-login-name').html('<i class="fa fa-user"></i>Login')
    } else {
        $('#user-login-name').html(`<i class="fa fa-user"></i>${userName}`)
    }

})();