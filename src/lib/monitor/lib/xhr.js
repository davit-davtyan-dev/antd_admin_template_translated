import tracker from '../utils/tracker';
export function injectXHR() {
    let XMLHttpRequest = window.XMLHttpRequest;
    let oldOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, async) {
        if (!url.match(/logstores/) && !url.match(/sockjs/)) {
            this.logData = { method, url, async };
        }
        return oldOpen.apply(this, arguments);
    }
    //There are two kinds behind the AXIOS, if Browser XMLHttpRequest Node HTTP
    let oldSend = XMLHttpRequest.prototype.send;
    //How to listen for fetch
    XMLHttpRequest.prototype.send = function (body) {
        if (this.logData) {
            let startTime = Date.now();//Record the time starting before sending
            //xmlhttprequestReadyState01234
            //STATUS 2XX 304 successful other is failed
            let handler = (type) => (event) => {
                let duration = Date.now() - startTime;
                let status = this.status;//200500
                let statusText = this.statusText;//OK Server Error
                tracker.send({
                    kind: 'stability',
                    type: 'xhr',
                    eventType: type,//loadErrorAbort
                    pathname: this.logData.url,//Request path
                    status: status + '-' + statusText,//status code
                    duration,//duration
                    response: this.response ? JSON.stringify(this.response) : '',//Respond to body
                    params: body || ''
                });
            }
            this.addEventListener('load', handler('load'), false);
            this.addEventListener('error', handler('error'), false);
            this.addEventListener('abort', handler('abort'), false);
        }
        return oldSend.apply(this, arguments);
    }
}