import tracker from '../utils/tracker';
import onload from '../utils/onload';
import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
export function timing() {
    let FMP, LCP;
    // Increase a viewer of a performance entry
    if (PerformanceObserver) {
        new PerformanceObserver((entryList, observer) => {
            let perfEntries = entryList.getEntries();
            FMP = perfEntries[0];//startTime After 2000
            observer.disconnect();//No longer observed
        }).observe({ entryTypes: ['element'] });//Observe the elements of the meaning of the page

        new PerformanceObserver((entryList, observer) => {
            let perfEntries = entryList.getEntries();
            LCP = perfEntries[0];
            observer.disconnect();//No longer observed
        }).observe({ entryTypes: ['largest-contentful-paint'] });//Observe the elements of the meaning of the page

        new PerformanceObserver((entryList, observer) => {
            let lastEvent = getLastEvent();
            let firstInput = entryList.getEntries()[0];
            console.log('FID', firstInput);
            if (firstInput) {
                //ProcessingStart starts processing time StartTime opens the clicked time difference is the delay of the processing
                let inputDelay = firstInput.processingStart - firstInput.startTime;
                let duration = firstInput.duration;//Treatment time
                if (inputDelay > 0 || duration > 0) {
                    tracker.send({
                        kind: 'experience',//User experience indicator
                        type: 'firstInputDelay',//First input delay
                        inputDelay,//Delay time
                        duration,//Treatment time
                        startTime: firstInput.startTime,
                        selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
                    });
                }

            }
            observer.disconnect();//No longer observed
        }).observe({ type: 'first-input', buffered: true });//Observe the elements of the meaning of the page
    }

    //User's first interactive click page
    onload(function () {
        setTimeout(() => {
            const {
                fetchStart,
                connectStart,
                connectEnd,
                requestStart,
                responseStart,
                responseEnd,
                domLoading,
                domInteractive,
                domContentLoadedEventStart,
                domContentLoadedEventEnd,
                loadEventStart
            } = performance.timing;
            tracker.send({
                kind: 'experience',//User experience indicator
                type: 'timing',//Statistical time for each stage
                connectTime: connectEnd - connectStart,//Connection time
                ttfbTime: responseStart - requestStart,//First byte arrival time
                responseTime: responseEnd - responseStart,//Response reading time
                parseDOMTime: loadEventStart - domLoading,//Dom analysis time
                domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
                timeToInteractive: domInteractive - fetchStart,//First interaction time
                loadTIme: loadEventStart - fetchStart //Complete loading time
            });


            let FP = performance.getEntriesByName('first-paint')[0];
            let FCP = performance.getEntriesByName('first-contentful-paint')[0];
            //Start sending performance indicators
            console.log('FP', FP);
            console.log('FCP', FCP);
            console.log('FMP', FMP);
            console.log('LCP', LCP);
            tracker.send({
                kind: 'experience',//User experience indicator
                type: 'paint',//Statistical time for each stage
                firstPaint: FP.startTime,
                firstContentfulPaint: FCP.startTime,
                firstMeaningfulPaint: FMP.startTime,
                largestContentfulPaint: LCP.startTime
            });
        }, 3000);
    });

}