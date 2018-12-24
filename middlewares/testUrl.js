const axios = require('axios');
const Parser = require('rss-parser');
module.exports = async (ctx, next) => {
    const url = encodeURI(ctx.state.feedUrl);
    try {
        const res = await axios.get(url);
        const parser = new Parser();
        let feed = await parser.parseString(res.data);
        delete feed.items;
        ctx.state.feed = feed;
    } catch (e) {
        if (!!e.respone) {
            switch (e.respone.status) {
                case 404:
                case 403:
                    throw new Error(e.respone.status);
                default:
                    throw new Error('FETCH_ERROR');
            }
        } else {
            throw new Error('FETCH_ERROR');
        }
    }
    await next();
};
