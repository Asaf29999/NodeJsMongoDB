const Woman = require('./Womanfunctions');
const Man = require('./Manfunctions');
const Club = require('./Clubfunctions');



var man = [
    {
        Type: 'post',
        Url: "/man",
        Func: Man.postMan
    },

    {
        Type: 'get',
        Url: "/men",
        Func: Man.getAllMen
    },

    {
        Type: 'get',
        Url: "/man/:id",
        Func: Man.getMan
    },
];

var woman = [
    {
        Type: 'post',
        Url: "/woman",
        Func: Woman.postWoman
    },

    {
        Type: 'get',
        Url: "/women",
        Func: Woman.getAllWomen
    },

    {
        Type: 'get',
        Url: "/woman/:id",
        Func: Woman.getWoman
    }
];
var club = [
    {
        Type: 'post',
        Url: "/club",
        Func: Club.postClub
    },
    {
        Type: 'get',
        Url: "/clubs",
        Func: Club.getAll
    },
    {
        Type: 'get',
        Url: "/club/best",
        Func: Club.getBest
    },
    {
        Type: 'get',
        Url: "/club/:id",
        Func: Club.getClub
    },
    {
        Type: 'put',
        Url: "/club/:id/Shiduch",
        Func: Club.Shiduch

    },
    {
        Type: 'put',
        Url: "/club/:id/women",
        Func: Club.addWoman
    },
    {
        Type: 'put',
        Url: "/club/:id/men",
        Func: Club.addMan
    },


];

module.exports = [...man, ...woman, ...club];