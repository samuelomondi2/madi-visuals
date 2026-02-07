
exports.me = (req, res) => {
    res.json({ userId: req.session.userId })
};
