const axios = require('axios');
const Parser = require('rss-parser');
const config = require('../config');
const hashFeed = require('../utils/hashFeed');
const _pick = require('lodash.pick');
const schedule = require('node-schedule');
const logger = require('./logger');
const { getAllFeeds, updateHashList, failAttempt, getFeedByUrl, resetErrorCount } = require('../proxies/rssFeed');

const fetch = async feedUrl => {
    try {
        logger.debug(`fetching ${feedUrl}`);
        const res = await axios.get(feedUrl);
        const parser = new Parser();
        const feed = await parser.parseString(res.data);
        const items = feed.items.slice(0, config.item_num);
        await resetErrorCount(feedUrl);
        return await Promise.all(
            items.map(async item => {
                return _pick(item, ['link', 'title', 'content']);
            })
        );
    } catch (e) {
        await failAttempt(feedUrl);
        getFeedByUrl(feedUrl).then(feed => {
            if (feed.error_count >= 5) {
                logger.info(feed, 'ERROR_MANY_TIME');
                process.send({
                    success: false,
                    message: 'MAX_TIME',
                    feed
                });
            }
        });
        if (e instanceof Error && e.respone) {
            switch (e.respone.status) {
                case 404:
                case 403:
                    throw new Error(e.respone.status);
                default:
                    throw new Error('FETCH_ERROR');
            }
        }
    }
};

const fetchAll = async () => {
    process.send && process.send('start fetching');

    const allFeeds = await getAllFeeds();
    await Promise.all(
        allFeeds.map(async eachFeed => {
            const oldHashList = JSON.parse(eachFeed.recent_hash_list);
            const newItems = await fetch(eachFeed.url, eachFeed.feed_id);
            if (!newItems) {
                logger.debug(eachFeed.url, `Error`);
            } else {
                const newHashList = await Promise.all(
                    newItems.map(async item => {
                        return await hashFeed(item.link, item.title);
                    })
                );
                await updateHashList(eachFeed.feed_id, newHashList);
                let sendItems = await Promise.all(
                    newItems.map(async item => {
                        const hash = await hashFeed(item.link, item.title);
                        if (oldHashList.indexOf(hash) === -1) return item;
                    })
                );
                sendItems = sendItems.filter(i => i);
                process.send &&
                    sendItems &&
                    process.send({
                        success: true,
                        sendItems,
                        eachFeed
                    });
            }
        })
    );
    logger.info('fetch a round');
};

function run() {
    try {
        fetchAll();
    } catch (e) {
        logger.error(e);
    }
}

run();
const rule = new schedule.RecurrenceRule();
const unit = config.fetch_gap.substring(config.fetch_gap.length - 1);
const gapNum = parseInt(config.fetch_gap.substring(0, config.fetch_gap.length - 1));
switch (unit) {
    case 'h':
        const hours = [];
        for (let i = 0; i < 24; i = i + gapNum) {
            hours.push(i);
        }
        rule.hour = hours;
        logger.info('fetch every ' + gapNum + ' hour(s)');
        break;
    case 'm':
    default:
        const minutes = [];
        for (let i = 0; i < 60; i = i + gapNum) minutes.push(i);
        rule.minute = minutes;
        logger.info('fetch every ' + gapNum + ' minutes');
        break;
}

const j = schedule.scheduleJob(rule, run);
