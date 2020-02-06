
const auth = (req, res, next) => {
    const { key } = req.query;
    const token = process.env.TOKEN;

    if( key === token ) {
        return next();
    }

    res.set('WWW-Authenticate', 'Basic realm="data/co2"');
    return res.status(401).send("🙅🏻 nope")
}

module.exports = auth;