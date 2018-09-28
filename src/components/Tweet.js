import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";
import { handleToggleTweet } from "../actions/tweets";
import { Link, withRouter } from "react-router-dom";

import {
  TiHeartFullOutline,
  TiArrowBackOutline,
  TiHeartOutline
} from "react-icons/ti";

class Tweet extends Component {
  handleLike = e => {
    e.preventDefault();

    const { dispatch, tweet, authUser } = this.props;

    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked: tweet.handleLike
      })
    );
  };
  toParent = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/tweet/${id}`);
  };

  render() {
    const { tweet } = this.props;
    if (tweet === null) {
      return <p>This Tweet doesn't exist</p>;
    }

    const {
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      id,
      parent
    } = tweet;

    return (
      <Link to={`/tweet/${id}`} className="tweet">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={e => this.toParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline color="#eo245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authUser, parentTweet)
      : null
  };
}

export default withRouter(connect(mapStateToProps)(Tweet));
