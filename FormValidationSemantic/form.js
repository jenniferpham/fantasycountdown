/**
 * Created by Jennifer on 2/12/2015.
 */
/**

 * JQUERY AND SEMANTIC UI VALIDATION
 */


(function ($) {
    $('.ui.form').form({
        givenName: {
            identifier: 'GivenName',
            rules: [{
                type: 'empty',
                prompt: 'Please enter your given name'
            }]
        },
        surname: {
            identifier: 'Surname',
            rules: [{
                type: 'empty',
                prompt: 'Please enter your surname'
            }]
        },
        username: {
            identifier: 'Username',
            rules: [{
                type: 'empty',
                prompt: 'Please enter a username'
            }]
        },
        email: {
            identifier: 'Email',
            rules: [{
                type: 'empty',
                prompt: 'Please enter your email'
            },{
                type: 'email',
                prompt: 'Please enter a valid email'
            }]
        },
        password: {
            identifier: 'Password',
            rules: [{
                type: 'empty',
                prompt: 'Please enter a password'
            },{
                type: 'length[6]',
                prompt: 'Password needs to be atleast 6 characters long'
            }]
        },
        passwordConfirm: {
            identifier: 'PasswordConfirm',
            rules: [{
                type: 'empty',
                prompt: 'Please enter a password'
            },{
                type: 'length[6]',
                prompt: 'Password needs to be at least 6 characters long'
            }]
        }
    }, {
        on: 'blur',
        inline: 'true'
    });
}(jQuery));