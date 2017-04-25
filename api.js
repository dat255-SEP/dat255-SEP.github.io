export async function test() {

    var http = require('http')
    var querystring = require('querystring')

    const options = {
        hostname: '192.168.56.101',
        port: 8080,
        path: '/mb/mqs',
        method: 'POST',
        headers: {
            'X-PortCDM-UserId' : 'porter',
            'X-PortCDM-Password' : 'porter',
            'X-PortCDM-APIKey' : 'eeee',
            'Content-Type': 'application/json',
        }
    };

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`)
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
        res.setEncoding('utf8')

        res.on('data', (chunk) => {
            return (chunk)
            console.log(`BODY: ${chunk}`)
        });
        res.on('end', () => {
            console.log('No more data in response.')
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`)
    });

    // write data to request body
    req.end()
}
