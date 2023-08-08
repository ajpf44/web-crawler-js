const { normalizeURL, getUrlFromHTML, crawlPage } = require('./crawl.js')
const {test, expect} = require('@jest/globals')

normalizeURL_tests()
getUrlFromHTML_tests()

function normalizeURL_tests(){
    test('normalizeURL strip protocol', ()=>{
        const input = 'https://www.google.com/search?q=search+term'
        const actual = normalizeURL(input)
        const expected = 'www.google.com/search'
    
        expect(actual).toEqual(expected)
    })
    
    test('normalizeURL strip trailing slash', ()=>{
        const input = 'https://blog.boot.dev/path/'
        const actual = normalizeURL(input)
        const expected = 'blog.boot.dev/path'
    
        expect(actual).toEqual(expected)
    })
    
    test('normalizeURL strip capitals', ()=>{
        const input = 'https://BLOG.boot.dev/path/'
        const actual = normalizeURL(input)
        const expected = 'blog.boot.dev/path'
    
        expect(actual).toEqual(expected)
    })
    
    test('normalizeURL strip http', ()=>{
        const input = 'http://blog.boot.dev/path/'
        const actual = normalizeURL(input)
        const expected = 'blog.boot.dev/path'
    
        expect(actual).toEqual(expected)
    })
}

function getUrlFromHTML_tests(){
    test('getURLfromHTML standard', ()=>{
        const firstInput = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>  
            <a href="http://blog.boot.dev/path/">Lorem, ipsum dolor.</a>
        </body>
        </html>
        `
        const secondInput = 'https://www.google.com/search?q=search+term'
        const actual = getUrlFromHTML(firstInput, secondInput)
        const expected = ['http://blog.boot.dev/path/']

        expect(actual).toEqual(expected)
    })

    test('getURLfromHTML relative URL', ()=>{
        const firstInput = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>  
            <a href="/path/">Lorem, ipsum dolor.</a>
        </body>
        </html>
        `
        const secondInput = 'http://blog.boot.dev/'
        const actual = getUrlFromHTML(firstInput, secondInput)
        const expected = ['http://blog.boot.dev/path/']

        expect(actual).toEqual(expected)
    })

    test('getURLfromHTML both', ()=>{
        const firstInput = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <a href="http://blog.boot.dev/path1/">Lorem, ipsum dolor.</a>
            <a href="/path2/">Lorem, ipsum dolor.</a>
        </body>
        </html>
        `
        const secondInput = 'http://blog.boot.dev'
        const actual = getUrlFromHTML(firstInput, secondInput)
        const expected = ['http://blog.boot.dev/path1/','http://blog.boot.dev/path2/']

        expect(actual).toEqual(expected)
    })

    test('getURLfromHTML invalid URL', ()=>{
        const firstInput = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>  
            <a href="invalid">invalidURL</a>
        </body>
        </html>
        `
        const secondInput = 'http://blog.boot.dev'
        const actual = getUrlFromHTML(firstInput, secondInput)
        const expected = []

        expect(actual).toEqual(expected)
    })
    
}