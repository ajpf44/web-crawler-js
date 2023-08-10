function printReport(pages){
    console.log(
        `===============\n`+
        `REPORT\n`+
        `===============`
    )

    const sortedPages = sortPages(pages)

    for(p of sortedPages){
        const url = p[0]
        const hits = p[1]

        console.log(`Found ${hits} to page ${url}`)
    }

    console.log(
        `===============\n`+
        `END REPORT\n`+
        `===============`
    )
}

function sortPages(pages){
    const arrPages = Object.entries(pages)

    const sortedPages = arrPages.sort((p1,p2)=>{
        return p2[1] - p1[1]
    })
    return sortedPages
}

module.exports ={
    sortPages,
    printReport
}