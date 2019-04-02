import React, { Component } from 'react';
import Image from './Image';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: false,
      page: 1,
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

  loadImages = () => {
    this.setState({ loading: true }, () => {
      fetch(`http://localhost:3001/images?page=${this.state.page}`)
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

  render() {
    var { loading, images } = this.state;


    return (
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
    )
  }
}

export default Gallery;
