import React from "react";

export default class Tweet extends React.Component {
  constructor(props) {
    super(props);
  }

  get replies() {
    return this.props.replies.map(reply => {
      return (
        <div key={reply.id_str} className={"panel panel-default"}>
          <div className={"panel-body"}>
            <p>{reply.full_text}</p>
            {this.getMedia(reply.extended_entities)}
            <a
              href={`https://twitter.com/${this.props.screen_name}/status/${reply.id_str}`}
              className={"btn btn-info"}
              target={"_blank"}
            >
              permlink
            </a>
          </div>
        </div>
      );
    });
  }

  getMedia(entities) {
  if(!entities) return (<div></div>);
    return (
      <div>
      {
        entities.media.map(media => {
          if(media.type === "video") {
            let src = media.video_info.variants
              .filter(v => v.bitrate)
              .find((v, i, arr) => arr.filter(_v => _v.bitrate <= v.bitrate).length === 1);
            return (
              <video key={src.url} src={src.url} controls={true}></video>
            );
          } else {
            return (
              <img key={media.media_url_https} style={{margin: "auto 10px",width: "180px", height: "auto"}} src={media.media_url_https}></img>
            );
          }
        })
      }
      </div>
    );
  }

  render() {
    return (
      <td>
        {this.replies}
      </td>
    );
  }
}
