const ytch = require('yt-channel-info');
const {channelId} = require("./GetYouTubeIdByUrl");
const {google} = require('googleapis');
const youtube = google.youtube('v3');

exports.postApi = async (req, res, next) => {
    try {
        const link = req.body.link;
        const startcount = req.body.startcount;
        const quanlity = req.body.quanlity;
        const end_count = parseInt(startcount) + parseInt(quanlity);
        await channelId(link).then(async (id) => {
            const payload = {
                channelId: id,
                channelIdType: 0,
            }
            // await ytch.getChannelInfo(payload).then(async (response) => {
            //     if (!response.alertMessage) {
            //         const subscriberCount = response.subscriberCount;
            //         const remains = end_count - parseInt(subscriberCount);
            //         const data= {remains:remains}
            //         res.json({ success: true,data })
            //     } else {
            //         res.json({ success: false,msg: 'Channel could not be found.' })
            //     }
            // }).catch((err) => {
            //     res.json({ success: false,msg: 'Error.' })
            // })
            getCountSub(id).then((subscriberCount) => {
                const remains = end_count - parseInt(subscriberCount);
                const data = {remains: remains}
                res.json({success: true, data})
            }).catch((err) => {
                res.json({success: false, msg: 'Error.'})
            })
        })
    } catch (e) {
        res.json({success: false, msg: 'Error.'})
    }
}

const getCountSub = async (id) => {
    try {
        //get id channel
        const youtube = google.youtube({
            version: 'v3',
            auth: "AIzaSyCpmtpTaIsRTAnc3YXLspiEtmtMJmwlE6k"
        });
        const response = await youtube.channels.list({
            id: id,
            part: 'statistics'
        });
        const subscriberCount = response.data.items[0]?.statistics?.subscriberCount;
        return subscriberCount;
    } catch (error) {
        throw new Error("Error in getCountSub: " + error);
    }
}