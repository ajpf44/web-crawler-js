const { JSDOM } = require('jsdom')

function normalizeURL(urlS){
    const nURL = new URL(urlS)
    const pURL = `${nURL.host}${nURL.pathname}`
    const finalURL =  pURL.endsWith('/')?pURL.slice(0, -1):pURL

    return finalURL
}

function getUrlFromHTML(htmlBody, baseURL){
    const urls = [];

    const dom = new JSDOM(htmlBody)

    const allTags_a=  dom.window.document.getElementsByTagName('a')
    
    for(const tag of allTags_a){
        const link = tag.href
        let url = null

        if(link[0] ==='/') url =`${baseURL}${tag.href}`
        else url = tag.href

        try{
            new URL(url)
            urls.push(url)
        }catch{
            console.log(`invalid url: '${link}', from: ${baseURL}`)
        }
    }

    return urls;
}

module.exports = {
    normalizeURL,
    getUrlFromHTML
}