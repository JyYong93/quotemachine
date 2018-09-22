import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const QUOTE_URL = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=';

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            quote: 'Constant repetition carries conviction.',
            author: 'Rober Collier',
            randBg: {background: "url('https://picsum.photos/1000/450/?random&"+ new Date().getTime() +"')"}
        };
        this.getNewQuote = this.getNewQuote.bind(this);
    }

    componentDidMount() {
        this.fetchQuote();
    }

    // Fetch a new quote from the api and set the state
    fetchQuote() {
        fetch(QUOTE_URL + new Date().getTime())
            .then(response => {
                return response.json();
            })
            .then(quote => {
                this.setState({
                    quote: quote[0].content,
                    author: quote[0].title,
                    randBg: {background: "url('https://picsum.photos/1000/450/?random&"+ new Date().getTime() +"')"}
                });
            });
    }

    // Update the quote and background by calling the two methods
    getNewQuote() {
        this.fetchQuote();
    }

    render() {
        return (
            <div>
                <QuoteBox getNewQuote={this.getNewQuote} boxStyle={this.state.randBg} author={this.state.author} quote={this.state.quote} />
            </div>
        );
    }
}

class QuoteBox extends React.Component {
    render() {
        return (
            <div id="quote-box" style={this.props.boxStyle}>
                <span id="text">{this.props.quote}</span>
                <span id="author">{this.props.author}</span>
                <div id="buttonsGroup">
                    <button id="new-quote" onClick={this.props.getNewQuote}><i class="fas fa-sync-alt"></i>Random Quote</button>
                    <a href={`https://twitter.com/intent/tweet/?text=${this.props.quote} - ${this.props.author}`}
                       target="_blank" id='tweet-quote'>
                        <button id="tweet"><i class="fab fa-twitter"></i>Tweet Quote</button>
                    </a>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("main"));