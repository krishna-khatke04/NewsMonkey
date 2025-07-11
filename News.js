import React, { Component } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 5,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    
    // document.title=`${this.Props.category}- NEWSMONKEY`;
  }
async updatedNews() {
  this.props.setProgress(0);
  this.setState({ loading: true });

  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1cabd790bf114c62b0e2f0e83ff102ed&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  
  const data = await fetch(url);
  this.props.setProgress(40);
  const parsedData = await data.json();
   this.props.setProgress(60);
  this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading: false,
   
  });
   this.props.setProgress(100);
}

  async componentDidMount() {
    this.updatedNews();
  }

  handlePreviousClick = async () => {
    this.setState({page:this.state.page-1});
   this.updatedNews();

  };

  handleNextClick = async () => {
   this.setState({page:this.state.page+1});
   this.updatedNews();

  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center mb-4">
           -Top Headlines -{this.state.category}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}
        </h2>

        {this.state.loading && <h5 className="text-center">Loading...</h5>}

        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => (
              <div className="col-md-3" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 50) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
        </div>

        <div className="container d-flex justify-content-between my-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>

          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
