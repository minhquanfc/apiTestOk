const ytch = require('yt-channel-info');
const {channelId} = require("./GetYouTubeIdByUrl");
const {google} = require('googleapis');
const youtube = google.youtube('v3');
const axios = require('axios');
const {token} = require("morgan");

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

exports.callApi = (req,res,next)=>{
    const token = "Bearer 590|Ynmw6oAweZBdpyIPOBhL8kgO9XwTPX3niIKEhSHh"
    axios.get('http://subcmc.api-simplesolution.one/api/v2/order/history/list?fromDay=10-09-2023&toDay=31-10-2023&user_id=-1&cancel=0&service_id=0',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            // console.log(response.data.data);
            const data123 = response.data.data;
            for (let i = 0; i < data123.length; i++) {
                // console.log(data123[i].order_id)
                await callApicheck(data123[i].order_id, token);
            }
            res.render('index', {title: 'Express'});
        })
        .catch(error => {
            console.error(error);
        });
}
// http://subcmc.api-simplesolution.one/api/v2/order/history/list?fromDay=07-10-2023&toDay=14-10-2023&user_id=-1&cancel=1&service_id=0
// callApicheck("267644","Bearer 590|Ynmw6oAweZBdpyIPOBhL8kgO9XwTPX3niIKEhSHh")
async function callApicheck(id,token) {
    axios.get('http://subcmc.api-simplesolution.one/api/v2/order/restore/'+id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            console.log(response.data.data.message);
        })
        .catch(error => {
            console.error("Loi "+id);
        });
}