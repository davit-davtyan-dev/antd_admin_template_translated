let lastEvent;
['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(eventType => {
    document.addEventListener(eventType, (event) => {
        lastEvent = event;
    }, {
        capture: true,//Capture phase
        passive: true//By default, the default subject
    });
});
export default function () {
    return lastEvent;
}