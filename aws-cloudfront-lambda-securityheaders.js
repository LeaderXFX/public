// CloudFront Viewer Response
// Lambda nodejs 8.10

'use strict';

exports.handler = (event, context, callback) => {
    console.log('Adding additional headers to CloudFront response.');

    const response = event.Records[0].cf.response;

    // HSTS
    response.headers['strict-transport-security'] = [{
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubdomains',
    }];
    response.headers['x-content-type-options'] = [{
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    }];
    response.headers['x-frame-options'] = [{
        key: 'X-Frame-Options',
        value: 'DENY',
    }];
    response.headers['x-xss-protection'] = [{
        key: 'X-XSS-Protection',
        value: '1; mode=block',
    }];
    response.headers['referrer-policy'] = [{
        key: 'Referrer-Policy',
        value: 'same-origin',
    }];
    response.headers['server'] = [{
        key: 'Server',
        value: 'Secure',
    }];

    // Set this 'value' for your specific environment. This is typically unique per website.
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    response.headers['content-security-policy'] = [{
        key: 'Content-Security-Policy',
        value: "frame-ancestors 'self'; font-src 'self' https://fonts.googleapis.com/ https://fonts.gstatic.com;",
    }];

    callback(null, response);
};
