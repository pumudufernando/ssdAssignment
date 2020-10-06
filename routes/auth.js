const { Router } = require('express')
const passport = require('passport')

// init router for auth
let router = Router()

router.get('/login', function (req, res) {

    if (req.user) res.redirect('/dashboard') // if auth
    else res.redirect('/auth/login/google') // if not auth

})

// login redirect function 
router.get('/login/google', passport.authenticate("google", {
    scope: ['profile', "https://www.googleapis.com/auth/drive.file", "email"]
}))

// callback from google o auth (with the token)
router.get('/google/redirect', passport.authenticate('google'), function (req, res) {

    res.redirect('/dashboard')
})

// logout function
router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/')
})

module.exports = router