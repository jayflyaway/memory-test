import React, { Component } from "react";
import _ from "lodash";
import "./App.css";
import NumberCard from "./NumberCard";
import Info from "./Info";
// import BlackWhiteCard from "./BlackWhiteCard";

const NUMBER_CARD_MARGIN = 5;
const NUMBER_CARD_WIDTH = 100 + 2 * NUMBER_CARD_MARGIN;
const NUMBER_CARD_HEIGHT = NUMBER_CARD_WIDTH;

// starting from 1
const ACTIVE_NUMBERS = 9;

let calculateRowsColumns = (width, height) => {
  let rows = parseInt(width / NUMBER_CARD_WIDTH);
  let cols = parseInt(height / NUMBER_CARD_HEIGHT);
  return {
    rows,
    cols
  };
};

// let toRowCol = cardID => {
//   let row = parseInt(cardID / NUMBER_CARD_HEIGHT);
//   let col = parseInt(cardID % NUMBER_CARD_WIDTH);
//   return {
//     row,
//     col
//   };
// };

// let toCardID = (row, col, colsPerRow) => {
//   return col + row * colsPerRow;
// };

let calculateRandomPlaces = numCells => {
  let cells = _.range(0, numCells);
  let shuffled = _.shuffle(cells);
  let selected = _.slice(shuffled, 0, ACTIVE_NUMBERS);

  let cellToNum = {};
  let num = 1;
  _.forEach(selected, cell => {
    cellToNum[cell] = num++;
  });

  return cellToNum;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.gameAreaRef = React.createRef();
    this.gameAreaHeight = 0;
    this.gameAreaWidth = 0;

    this.activeCellToNum = [];
    this.doneNums = [];
    this.state = {
      nextNum: 1,
      turned: false,
      failed: false
    };
    this.onNextNumClick = this.onNextNumClick.bind(this);
  }

  componentDidMount() {
    const gameAreaNode = this.gameAreaRef.current.getBoundingClientRect();
    this.gameAreaHeight = gameAreaNode.height;
    this.gameAreaWidth = gameAreaNode.width;
    const { rows, cols } = calculateRowsColumns(
      this.gameAreaWidth,
      this.gameAreaHeight
    );
    this.cells = rows * cols;

    this.activeCellToNum = calculateRandomPlaces(this.cells);
    this.state.doneNums = [];
    this.setState({
      nextNum: 1,
      turned: false,
      failed: false
    });
  }

  render() {
    return (
      <React.Fragment>
        <div ref={this.gameAreaRef} id="game-area">
          {this.renderNumberCards()}
        </div>
        <div id="game-info">
          <Info />
          <h4>Click on 1 to start the test</h4>
          <p>
            Goal: remember the layout of numbers 1-9 on this page. The numbers
            are turned upside down when you click on number 1. And you have to
            recall the remaining numbers in order by clicking on upside down
            cards.
          </p>
        </div>
      </React.Fragment>
    );
  }

  renderNumberCards() {
    let cellNums = _.range(0, this.cells);

    return cellNums.map(n => (
      <NumberCard
        key={n}
        active={n in this.activeCellToNum}
        num={n in this.activeCellToNum ? this.activeCellToNum[n] : null}
        turned={this.state.turned}
        done={
          n in this.activeCellToNum &&
          this.state.doneNums.includes(this.activeCellToNum[n])
        }
        failed={this.state.failed}
        onNextNumClick={this.onNextNumClick}
      />
    ));
  }

  onNextNumClick(num) {
    console.log(num, num === 1, this.state);
    if (num === 1) {
      this.setState({
        nextNum: 2,
        turned: true,
        doneNums: _.concat(this.state.doneNums, [1])
      });
    } else if (num === this.state.nextNum) {
      this.setState({
        nextNum: this.state.nextNum + 1,
        doneNums: _.concat(this.state.doneNums, [num])
      });
      // TODO handle with num == 9
    } else if (num !== this.state.nextNum) {
      this.setState({
        failed: true
      });
    }
  }
}

export default App;
