const Account = require('../models/account.js');

exports.findAll = (req, res) => {
    Account.find((err, accounts) => {
        if (err) throw err;
        res.send(accounts)
    });
};

exports.addAccount = (req, res) => {
    Account.create(req.body, (err, account) => {
        if (err) throw err;
        res.send(account);
    })
}

exports.login = (req, res) => {
    Account.find()
        .where('username').equals(req.body.username)
        .where('password').equals(req.body.password)
        .count(function (error, numRows) {
            res.status(200).json({
                count: numRows
            });
        });
}
