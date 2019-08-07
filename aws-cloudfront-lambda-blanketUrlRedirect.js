// CloudFront Viewer Request
// Lambda nodejs 8.10

'use strict';

exports.handler = (event, context, callback) => {
const request = event.Records[0].cf.request;
const headers = request.headers;
const host = headers['host'][0].value;
const expectedHost = 'www.example.com';

/// 302 if the host isn't the expectedHost
if (host !== expectedHost) {
    console.log('RequestedHost: ', host);
    console.log('ExpectedHost: ', expectedHost);

    const response = {
        status: '301',
        statusDescription: 'Found',
        headers: {
            location: [{
                key: 'Location',
                value: 'https://www.example.com/',
            }],
        },
    };
    console.log('callback: ', response);
    callback(null, response);
}

else {
    callback(null, request);
}

};
