const ytch = require('yt-channel-info');
const {channelId} = require("./GetYouTubeIdByUrl");

exports.postApi = async (req,res,next) =>{
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
            await ytch.getChannelInfo(payload).then(async (response) => {
                if (!response.alertMessage) {
                    const subscriberCount = response.subscriberCount;
                    const remains = end_count - parseInt(subscriberCount);
                    const data= {remains:remains}
                    res.json({ success: true,data })
                } else {
                    res.json({ success: false,msg: 'Channel could not be found.' })
                }
            }).catch((err) => {
                res.json({ success: false,msg: 'Error.' })
            })
        })
    }catch (e) {
        res.json({ success: false,msg: 'Error.' })
    }
}