import React, { Component } from 'react';
import twitterIcon from './twitter.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalData: [],
      quotes: [],
      random: null,
      quote: {
        text: '',
        author: '',
      },
    };
    this.getNextQuote = this.getNextQuote.bind(this);
    this.getTweetUrl = this.getTweetUrl.bind(this);
  }

  getTweetUrl() {
    return `https://twitter.com/intent/tweet?hashtags=quotes&text="${this.state.quote.text}" ${this.state.quote.author}`;
  }

  componentDidMount() {
    const url = 'https://type.fit/api/quotes';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let r = Math.floor(Math.random() * this.state.quotes.length);
        let i = 0;
        const temp = [...data];
        temp.forEach((obj) => {
          obj.id = i;
          i++;
        });
        this.setState({
          originalData: temp,
          quotes: [...temp],
          random: r,
          quote: {
            text: data[r].text,
            author: data[r].author,
          },
        });
      })
      .catch((err) => console.error(err));
  }
  getNextQuote() {
    const newQuotes = [
      ...this.state.quotes.filter(
        (obj) => obj.id !== this.state.quotes[this.state.random].id
      ),
    ];
    const r = Math.floor(Math.random() * newQuotes.length);
    if (newQuotes.length >= 1) {
      this.setState({
        random: r,
        quotes: newQuotes,
        quote: {
          text: newQuotes[r].text,
          author: newQuotes[r].author,
        },
      });
    } else {
      this.setState({
        random: r,
        quotes: [...this.state.originalData],
        quote: {
          text: [...this.state.originalData][r].text,
          author: [...this.state.originalData][r].author,
        },
      });
    }
  }
  render() {
    return (
      <div className='wrapper' id='quote-box'>
        <header>
          <h1 className='title py-4 fw-bold text-center text-uppercase'>
            QUETES GENERATOR
          </h1>
        </header>
        <main className='d-flex justify-content-center align-items-center'>
          <div className='quote-container shadow-lg d-flex flex-column'>
            <div className='quote-wrapper'>
              <blockquote className='blockquote rounded-3 px-2 pt-3 pb-0 d-flex flex-column justify-content-center align-items-center'>
                <div className='quote'>
                  <p className='fs-5 px-2 pt-2 pb-0 m-0'>
                    <span className='left'>
                      <img src='./left-quotes-sign.png' alt='' />
                    </span>
                    <span id='text' className='quote-text'>
                      {this.state.quote.text}
                    </span>

                    <span className='right'>
                      <img src='./right-quotes-symbol.png' alt='' />
                    </span>
                  </p>
                  <footer>
                    <h6
                      id='author'
                      className='author text-capitalize fst-italic'
                    >
                      {this.state.quote.author}
                    </h6>
                  </footer>
                </div>
              </blockquote>
              <button
                type='button'
                id='new-quote'
                className='btn next-btn'
                onClick={this.getNextQuote}
              >
                Next
              </button>
            </div>

            <div className='social-media p-2'>
              <a
                id='tweet-quote'
                className='tweet-link d-inline-block'
                href={this.getTweetUrl()}
                target='_blank'
              >
                <img
                  className='icon d-inline-block'
                  src={twitterIcon}
                  alt='tweeter'
                />
              </a>
            </div>
          </div>
        </main>
        <footer className='p-2 m-0 text-center bg-light'>
          <p className='m-0'>Copyright 2022</p>
        </footer>
      </div>
    );
  }
}

export default App;
