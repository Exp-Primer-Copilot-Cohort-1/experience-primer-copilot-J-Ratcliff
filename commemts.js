// Create web server
// Run server
// Send response to client
// Receive request from client
// Get data from client
// Send data to client
// Receive data from client

// 1. Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./lib/template.js');

const app = http.createServer((request, response) => {
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;

    if(pathname === '/') {
        if(queryData.id === undefined) {
            fs.readdir('./data', (error, filelist) => {
                const title = 'Welcome';
                const description = 'Hello, Node.js';
                const list = template.list(filelist);
                const html = template.HTML(title, list, `<h2>${title}</h2><p>${description}</p>`, `<a href="/create">create</a>`);
                response.writeHead(200);
                response.end(html);
            });
        } else {
            fs.readdir('./data', (error, filelist) => {
                fs.readFile(`data/${queryData.id}`, 'utf8', (error, description) => {
                    const title = queryData.id;
                    const list = template.list(filelist);
                    const html = template.HTML(title, list, `<h2>${title}</h2><p>${description}</p>`, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } else if(pathname === '/create') {
        fs.readdir('./data', (error, filelist) => {
            const title = 'WEB - create';
            const list = template.list(filelist);
            const html = template.HTML(title, list, `
                <form action="/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `, '');
            response.writeHead(200);
            response.end(html);
        });
    }});