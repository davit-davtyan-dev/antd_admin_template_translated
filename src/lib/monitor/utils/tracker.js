import { tracker } from "@/api/monitor";
import userAgent from "user-agent";
import store from "@/store";
import { addBug } from "@/store/actions"

function getExtraData() {
  return {
    title: document.title,
    url: window.location.href,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent).name,
  };
}
//GIF picture is made uploaded pictures, there is no cross-domain problem,
class SendTracker {
  // send(data = {}) {
  //   let extraData = getExtraData();
  //   let logInfo = { ...extraData, ...data };

  //   // Picture point
  //   const img = new window.Image();
  //   img.src = `${feeTarget}?d=${encodeURIComponent(JSON.stringify(logInfo))}`;
  // }
  send(data = {}) {
    let extraData = getExtraData();
    let logInfo = { ...extraData, ...data };
    tracker(logInfo);
    store.dispatch(addBug(logInfo));
  }
}

export default new SendTracker();
