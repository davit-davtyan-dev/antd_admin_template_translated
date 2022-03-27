class Typing {
  constructor(opts) {
    this.opts = opts || {};
    this.source = opts.source;
    this.output = opts.output;
    this.delay = opts.delay || 120;
    this.chain = {
      parent: null,
      dom: this.output,
      val: []
    };
    if (!(typeof this.opts.done === 'function')) this.opts.done = function () {
    };
  }

  init() {
    //Initialization function
    this.chain.val = this.convert(this.source, this.chain.val);
  }

  convert(dom, arr) {
    //Convert the child node of the DOM node into an array,
    let children = Array.from(dom.childNodes)
    for (let i = 0; i < children.length; i++) {
      let node = children[i]
      if (node.nodeType === 3) {
        arr = arr.concat(node.nodeValue.split(''))   //Convert a string to a string array, and will only one print when printing.
      } else if (node.nodeType === 1) {
        let val = []
        val = this.convert(node, val)
        arr.push({
          'dom': node,
          'val': val
        })
      }
    }
    return arr
  }

  print(dom, val, callback) {
    setTimeout(function () {
      dom.appendChild(document.createTextNode(val));
      callback();
    }, this.delay);
  }

  play(ele) {
    //When printing the last character, the animation is completed, perform DONE
    if (!ele.val.length) {
      if (ele.parent) this.play(ele.parent);
      else this.opts.done();
      return;
    }
    let current = ele.val.shift()  //Get the first element while deleting the first element in the array
    if (typeof current === 'string') {
      this.print(ele.dom, current, () => {
        this.play(ele); //Continue to print the next character
      })
    } else {
      let dom = current.dom.cloneNode() //Clone node, child node, no cloning, so you don't have to add parameters True
      ele.dom.appendChild(dom)
      this.play({
        parent: ele,
        dom,
        val: current.val
      })
    }
  }

  start() {
    this.init();
    this.play(this.chain);
  }
}

export default Typing