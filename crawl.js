const { JSDOM } = require('jsdom')

async function crawlPage(url){
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors'
        })
        
        if (response.status > 399){
            console.log(`Error in fetch with the status codes: ${response.status}, on url: ${url}`)
            return -2
        }

        const contentType = response.headers.get('content-type')
        console.log(contentType)
        if(!contentType.includes('text/html')){
            console.log(`Non html response, content-type: ${contentType}, on url: ${url}`)
            return -3
        }

        console.log(getUrlFromHTML(await response.text(), url))
    } catch (error) {
        console.log(`error in fetch: ${error}, on url ${url}`)
    }
}

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
        let url = null

        if(tag.href[0] ==='/') url =`${baseURL}${tag.href}`
        else url = tag.href

        try{
            new URL(url)
            urls.push(url)
        }catch{
            console.log(`invalid url: '${url}', from: ${baseURL}`)
        }
    }

    return urls;
}

module.exports = {
    normalizeURL,
    getUrlFromHTML,
    crawlPage
}