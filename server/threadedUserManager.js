const request = require("request");
const User = require("./user");
const getTwitterGuestToken = require("./getTwitterGuestToken");

const query = "include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&send_error_codes=true&count=32767";

module.exports = class ThreadedUsers {
  constructor(url) {
    this.target = url;
  }
  
  get statusId() {
    let [_, statusId] = /https\:\/\/twitter.com\/[a-zA-Z0-9\-\_]+\/status\/(\d+)/.exec(this.target);
    return statusId;
  }
  get apiURL() {
    return `https://api.twitter.com/2/timeline/conversation/${this.statusId}.json?${query}`;
  }

  fetch() {
    return getTwitterGuestToken(this.statusId).then(tokens => {
      let headers = Object.assign(tokens, {
        origin: "https://mobile.twitter.com",
        "x-twitter-active-user": "yes",
        "x-twitter-client-language": "ja"
      });
      console.log(headers);
      return (new Promise((resolve, reject) => 
        request.get({
          url: this.apiURL,
          headers: headers
        },
          (err, res) => err ? reject(err) : resolve(res)
        )
      ))
    })
      .then(res => JSON.parse(res.body))
      .then(res => {
        let users = res.globalObjects.users
        this.users = Object.keys(users).map(key => users[key]);
        return this;
      });
  }

}
