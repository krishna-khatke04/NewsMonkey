import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date, source } =
      this.props;

    return (
      <div className="card my-3">
        <img
          src={imgUrl ? imgUrl : "https://via.placeholder.com/150"}
          className="card-img-top"
          alt="News"
        />
        <div className="card-body">
          <span className="badge rounded-pill bg-danger">{source}</span>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} on{" "}
              {new Date(date).toLocaleString()}
            </small>
          </p>

          <a
            href={newsUrl}
            className="btn btn-sm btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default Newsitem;
