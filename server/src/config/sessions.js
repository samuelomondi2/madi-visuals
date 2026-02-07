const session = require("express-session");
const { RedisStore } = require("connect-redis");
const redisClient = require("./redis");

console.log('SESSION_SECRET:', process.env.SESSION_SECRET);

module.exports = session({
    name: 'sid',
    store: new RedisStore({ client: redisClient, prefix: `sess:${process.env.APP_ENV || 'staging'}:`  }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.APP_ENV === 'production',
        sameSite: process.env.APP_ENV === 'production' ? 'strict':'lax',
        maxAge: 1000 * 60 * 60 * 24
    }
});