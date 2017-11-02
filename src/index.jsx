import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import App from "./app.jsx";
const api = "https://mysticdoll.com/tools/tweet/tweetThread";
const url = document.getElementById("tweet-url");
const button = document.getElementById("fetcher");
const shareButton = document.getElementById("share-button");
const container = document.getElementById("app-container");
const initExp = /\#(\d+)/.exec(location.hash);

const renderView = (url, target) => {
  return fetch(
    api,
    {
      method: "POST",
      body: JSON.stringify({url: url}),
      headers: {"Content-Type": "application/json"}
  })
    .then(res => res.json())
    .then(r => {
      unmountComponentAtNode(target);
      render(
        <App users={r.users}></App>,
        target
      );
      return url;
    });

};

const setTwitterShareURL = () => {
  const widget = document.querySelector("iframe");
  widget.setAttribute("data-url", location.href);
  let src = widget.getAttribute("src");
  let currentURL = src.replace(/url\=.+\&/, `url=${encodeURIComponent(location.href)}&`);
  let parent = widget.parentNode;
  widget.setAttribute("src", currentURL);
  parent.removeChild(widget);
  parent.appendChild(widget.cloneNode());
};

const listener = (init) => {
  button.setAttribute("disabled", "");
  renderView(
    init || url.value,
    container
  ).then(url => {
    location.hash = `#${/(\d+)\/?$/.exec(url)[1]}`
      button.removeAttribute("disabled");
      setTwitterShareURL();
    }).catch(() => {
      button.removeAttribute("disabled");
    });
};

button.addEventListener("click", () => listener());

url.addEventListener("keydown", e => {
  if(e.keyCode === 13) {
    listener();
  }
});

if(initExp) {
  listener(`https://twitter.com/placeholder/status/${initExp[1]}`)
}
