const app = {};

app.config = {
    'sessionToken': false
};

app.client = {};

app.client.request = function (headers, path, method, queryStringObject, payload, callback) {
    headers = typeof (headers) === 'object' && headers !== null ? headers : {};
    path = typeof (path) === 'string' ? path : '/';
    method = typeof (method) === 'string' && ['POST', 'PUT', 'GET', 'DELETE'].indexOf(method) > -1 ? method.toUpperCase() : 'GET';
    queryStringObject = typeof (queryStringObject) === 'object' && queryStringObject !== null ? queryStringObject : {};
    payload = typeof (payload) === 'object' && payload !== null ? payload : {};
    callback = typeof (callback) === 'function' ? callback : false;
    let requestUrl = path + '?';
    let counter = 0;
    for(let queryKey in queryStringObject) {
        if(queryStringObject.hasOwnProperty(queryKey)) {
            counter++;
            if(counter > 1) {
                requestUrl += '&';
            }

            requestUrl += queryKey + '=' + queryStringObject[queryKey]
        }
    }

    const xhr = new XMLHttpRequest();
    xhr.open(method, requestUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    for(let headerKey in headers) {
        if(headers.hasOwnProperty(headerKey)) {
            xhr.setRequestHeader(headerKey, headers[headerKey])
        }
    }

    if(app.config.sessionToken) {
        xhr.setRequestHeader('token', app.config.sessionToken.id);
    }

    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            const statusCode = xhr.status;
            const responseRetured = xhr.responseText;

            if(callback) {
                try {
                    const parsedResponse = JSON.parse(responseRetured)
                    callback(statusCode, parsedResponse)
                } catch (e) {
                    callback(statusCode, false)
                }
            }

        }
    };

    const payloadString = JSON.stringify(payload);

    xhr.send(payloadString)

};