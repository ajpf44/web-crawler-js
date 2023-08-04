function normalizeURL(urlS){
    const nURL = new URL(urlS)
    const pURL = `${nURL.host}${nURL.pathname}`
    const finalURL =  pURL.endsWith('/')?pURL.slice(0, -1):pURL

    return finalURL
}

module.exports = {normalizeURL}