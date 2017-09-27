import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import App from "./app.jsx";
const api = "https://mysticdoll.com/tools/tweet/tweetThread";
const url = document.getElementById("tweet-url");
const button = document.getElementById("fetcher");
const container = document.getElementById("app-container");

button.addEventListener("click", () => {
  fetch(
    api,
    {
      method: "POST",
      body: JSON.stringify({url: url.value}),
      headers: {"Content-Type": "application/json"}
  })
    .then(res => res.json())
    .then(r => {
      unmountComponentAtNode(container);
      render(
        <App users={r.users}></App>,
        container
      );
    });
});

