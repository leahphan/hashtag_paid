import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Filtering from './Filtering';
import Image from './Image';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: false,
      page: 1,
      sortBy: null,
      search: null,
      hasMore: true,
    }
  }

  fetchUrl = () => {
    const { sortBy, search } = this.state;

    let url = `http://localhost:3001/images?`
    if (sortBy) {
      const direction = (sortBy == ('user_name' || 'age')) ? 'asc' : 'desc';
      url = url + `q[s]=${sortBy} ${direction}&`
    }
    if (search) {
      url = url + `q[user_name_cont]=${search}&`
    }
    url = url + `page=${this.state.page}`

    return url
  }

  loadImages = (params) => {
    fetch(this.fetchUrl())
      .then(res => res.json())
      .then(json => {
        const currentPage = this.state.page + 1

        this.setState({
          images: [
            ...this.state.images,
            ...json.data
          ],
          loading: false,
          page: currentPage,
          hasMore: currentPage >= json.total_pages ? false : true
        })
    })
  }

  handleSearch = (search) => {
    this.setState({
      search: search,
      images: [],
      page: 1,
      hasMore: true,
    });
    this.loadImages();
  }

  handleSort = (sortBy) => {
    this.setState({
      sortBy: sortBy,
      images: [],
      page: 1,
      hasMore: true,
    });
    this.loadImages();
  }

  render() {
    const { loading, images } = this.state;

    return (
      <div>
        <Filtering handleSearch={this.handleSearch} handleSort={this.handleSort} />
          <InfiniteScroll
            pageStart={this.state.page}
            loadMore={this.loadImages}
            hasMore={this.state.hasMore}
            loader={<div className="loader" key={0}>Loading ...</div>}
          >
          <main role="main">
            <div className="album py-5 bg-light">
              <div className="container">
                <div className="row">

                  {images.map((image) => (
                    <Image
                      key={image.id}
                      id={image.id}
                      picture={image.picture}
                    />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </InfiniteScroll>
      </div>
    )
  }
}

export default Gallery;
