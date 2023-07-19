/*
 * Copyright (c) 2014-2021 旋風之音 GoneTone
 *
 * Website: https://blog.reh.tw/
 * GitHub: https://github.com/GoneTone
 * Facebook: https://www.facebook.com/GoneToneDY
 * Twitter: https://twitter.com/TPGoneTone
 *
 * Project GitHub: https://github.com/GoneToneStudio/node-get-youtube-id-by-url
 */

'use strict'

const axios = require('axios')
const cheerio = require('cheerio')

const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36',
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language':'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5,pl;q=0.4',
    'Cache-Control':'max-age=0',
    'Cookie':'GPS=1; YSC=wSvP2vUYAoY; VISITOR_INFO1_LIVE=z1I0o9u2gkY; PREF=f4=4000000&f6=40000000&tz=Asia.Saigon; CONSISTENCY=ACeCFAUXlLOO33tOnVqQL6uDVgLMt9pwUROuGOy2tVrAvplrb-rjE1F5ZrBupjhZGQMjctJpOtSNuZzQQSBebMmzfyyS1sPh6ieq2R_oNKxWijiW6a6jgbcL8wcbVr_SLVprJsGELId6x1NS0TjN9kc'
  },
  validateStatus: () => {
    return true
  }
})
 /**
 * Check YouTube Url
 *
 * @param {string} url
 * @returns {boolean}
 */
const checkUrl = (url) => url.indexOf('youtube.com') !== -1 || url.indexOf('youtu.be') !== -1

 /**
 * Get YouTube Channel ID By Url
 *
 * @param {string} url Channel Url
 * @returns {Promise<string>} Channel ID
 */
const channelId = async (url) => {
  if (checkUrl(url)) {
    const ytChannelPageResponse = await axiosInstance.get(url)
    const $ = cheerio.load(ytChannelPageResponse.data)
    const id = $('meta[itemprop="identifier"]').attr('content')
    if (id) {
      return id
    }
  } else {
    throw Error(`"${url}" is not a YouTube url.`)
  }

  throw Error(`Unable to get "${url}" channel id.`)
}

/**
 * Get YouTube Video ID By Url
 *
 * @param {string} url Video Url
 * @returns {Promise<string>} Video ID
 */
const videoId = async (url) => {
  if (checkUrl(url)) {
    const ytChannelPageResponse = await axiosInstance.get(url)
    const $ = cheerio.load(ytChannelPageResponse.data)

    const id = $('meta[itemprop="videoId"]').attr('content')
    if (id) {
      return id
    }
  } else {
    throw Error(`"${url}" is not a YouTube url.`)
  }

  throw Error(`Unable to get "${url}" video id.`)
}

module.exports = {
  channelId,
  videoId
}
