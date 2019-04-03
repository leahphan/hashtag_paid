import React, { Component } from 'react';
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
    }

    window.onscroll = () => {
      const {
        loadImages,
        state: {
          error,
          loading,
        },
      } = this;

      if (loading) return;

      // Checks that the page has scrolled to the bottom
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight + 500)
      ) {
        this.setState({
          page: this.state.page + 1
        })
        loadImages();
      }
    };
  }

  componentWillMount() {
    this.loadImages();
  }

  fetchUrl = () => {
    const { sortBy } = this.state;

    let url = `http://localhost:3001/images?`
    if (sortBy) {
      const direction = sortBy == 'user_name' || 'age' ? 'asc' : 'desc';
      url = url + `q[s]=${sortBy} ${direction}&`
    }
    url = url + `page=${this.state.page}`

    return url
  }

  loadImages = (params) => {
    this.setState({ loading: true }, () => {
      fetch(this.fetchUrl())
        .then(res => res.json())
        .then(json => {
          this.setState({
            images: [
              ...this.state.images,
              ...json],
            loading: false,
          })
        })
    })
  }

  handleSort = (sortBy) => {
    this.setState({ sortBy: sortBy, images: [], page: 1 });
    this.loadImages();
  }

  render() {
    const { loading, images } = this.state;

    return (
      <div>
        <Filtering handleSort={this.handleSort} />
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

              <div>{loading ? 'Loading...' : ''}</div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Gallery;
