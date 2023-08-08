const { crawlPage } = require('./crawl.js')

async function main(){
    if( process.argv.length < 3){
        console.log('no website provided')
        process.exit(1)
    }else if( process.argv.length>3 ){
        console.log(`Only one URL can be passed as parameters`)
    }
    
    const baseURL = process.argv[2]
    console.log(`Starting crawl of: ${baseURL}`)
    
    const pagesObject = await crawlPage(baseURL, baseURL, {})

    for(p of Object.entries(pagesObject)) console.log(p)
}

main()

