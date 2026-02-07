const authService = require("../services/auth.service");
// const { generateToken } = require('../middleware/csrf.middleware');

exports.register = async (req, res, next) => {
    try {
        await authService.register(req.body);
        res.status(201).json({ message: "User created"})
    } catch (error) {
        next(error)
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await authService.login(req.body);

        req.session.regenerate(() => {
            req.session.userId = user.id;
            res.json({ message: "Logged In" });
        })
    } catch (error) {
        next(error)
    }
};

exports.logout = async (req, res, next) => {
    req.session.destroy(() => {
        res.clearCookie("sid");
        res.json({ message: "Logged out" })
    })
};

exports.csrfToken = (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
};
  


  