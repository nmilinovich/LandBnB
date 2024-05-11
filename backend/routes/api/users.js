const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Username is required'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username is required'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({ checkFalsy: true})
      .withMessage('First Name is required'),
      check('lastName')
      .exists({ checkFalsy: true})
      .withMessage('Last Name is required'),
    handleValidationErrors
  ];

router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
        const { email, password, username, firstName, lastName } = req.body;

        userEmailUniqueValidation = await User.findOne({
          where: {
            email: email
          }
        });
        userUsernameUniqueValidation = await User.findOne({
          where: {
            username: username
          }
        });

        if(userEmailUniqueValidation) {
          const err = new Error("User already exists");
          err.message = "User already exists";
          err.errors = {"email": "User with that email already exists"};
          return next(err)
        }

        if(userUsernameUniqueValidation) {
          const err = new Error("User already exists");
          err.message = "User already exists";
          err.errors = {"username": "User with that username already exists"};
          return next(err)
        }

        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({ firstName, lastName, email, username, hashedPassword });

        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

module.exports = router;
