export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    //According to the last trigger time interval
    const last = +new Date() - timestamp;

    //The last time the package is called the time interval LAST smaller than the set time interval Wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      //If set to immediate === True, because the start border has been called without calls
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    //If the delay does not exist, reset delay
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
//Find menuitem with this property value from Menulist value according to a property value
export function getMenuItemInMenuListByProperty(menuList, key, value) {
  let stack = [];
  stack = stack.concat(menuList);
  let res;
  while (stack.length) {
    let cur = stack.shift();
    if (cur.children && cur.children.length > 0) {
      stack = cur.children.concat(stack);
    }
    if (value === cur[key]) {
      res = cur;
    }
  }
  return res;
}

/**
 * @description Convert timestamp to year-month-day-time-minute-second format
 * @param {String} timestamp
 * @returns {String} Year - Month - Japan - Time - Second
 */

export function timestampToTime(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());

  let strDate = Y+M+D+h+m+s;
  return strDate;
}