const { crawlPage } = require('./crawl.js')

function main(){
    if( process.argv.length < 3){
        console.log('no website provided')
        process.exit(1)
    }else if( process.argv.length>3 ){
        console.log(`Only one URL can be passed as parameters`)
    }
    
    const baseURL = process.argv[2]
    console.log(`Starting crawl of: ${baseURL}`)
    
    crawlPage(baseURL)
}

main()

