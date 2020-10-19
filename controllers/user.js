'use strict'

const controller = {
    login: (req, res) => {
        return res.send('login');
    },

    register: (req, res) => {
        return res.send('register');
    }
}
module.exports = controller;
