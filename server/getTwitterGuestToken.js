const chromeLauncher = require("chrome-launcher");
const CDP = require("chrome-remote-interface");

module.exports = function(statusId) {
  let url = `https://mobile.twitter.com/placeholdername/status/${statusId}`;
  return new Promise((resolve, reject) => {
    chromeLauncher.launch({
      startingUrl: "target:blank",
      chromeFlags: ["--headless", "--disable-gpu", "--no-sandbox"]
    }).then(chrome => {
      const options = {port: chrome.port};
      CDP(options, client => {
        const {Network, Page} = client;
        Network.requestIntercepted(e => {
          if(e.request.headers.authorization && e.request.headers["x-guest-token"]){
            chrome.kill();
            resolve({
              authorization: e.request.headers.authorization,
              "x-guest-token": e.request.headers["x-guest-token"]
            });
          }
          Network.continueInterceptedRequest({interceptionId: e.interceptionId});
        });
        Promise.all([
          Network.enable(),
          Page.enable(),
          Network.setRequestInterceptionEnabled({
            enabled: true,
            patterns:["*"]
          })
        ]).then(() => {
          Page.navigate({url: url});
          Page.loadEventFired(() => {
            setTimeout(() => {
              chrome.kill().then(() => reject(new Error("timeout"))); 
            }, 180000);
          });
        });
      })
    })
    
  });
};
