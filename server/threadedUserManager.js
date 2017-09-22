const {JSDOM} = require("jsdom");
const request = require("request");
const User = require("./user");

const DOMQUERY = ".tweet.js-stream-tweet.js-profile-popup-actionable";

module.exports = class ThreadedUsers {
  constructor(url) {
    this.target = url
  }

  fetch() {
    return (new Promise((resolve, reject) => 
      request.get({url: this.target}, (err, res) => err ? reject(err) : resolve(res))))
        .then(res => {
          this.rawDOM = new JSDOM(res.body);
          return this.rawDOM;
        })
        .then(dom => {
          this.users = this.listUser(dom);
          return this;
        })
  }

  listUser(dom) {
    return [...dom.window.document.querySelectorAll(DOMQUERY)]
      .map(elm => User.factory(elm))
      .filter((u, i, arr) => 
        arr.slice(0,i)
        .filter(_u => _u.userId === u.userId).length === 0); 
  }
}
