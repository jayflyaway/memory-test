import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import "./Result.css";

class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {  showModal: false };
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.setState({showModal: nextProps.showResult })
  }

  render() {
    this.setCookies();
    return this.renderResult();
  }


  renderResult() {
    return (
      <Modal
      centered={true}
      show={this.state.showModal}
      onHide={() =>this.closeModal()}
      >
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="custom-header">
            <i className="material-icons md-36">tour</i>
            <span> Result</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Congrats! Your score is {this.props.score}
        <p>Want to try again?</p>
        <button
          className="button"
          onClick={this.props.resetGame}>
          play again
        </button>
      </Modal.Body>
      </Modal>
    );
  }

  
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  setCookies(){
    const highScore = this.getCookie('highScore');
    this.setCookie('lastScore', this.props.score, 365);
    if(highScore === '' || parseInt(highScore) < this.props.score) {
      this.setCookie('highScore', this.props.score, 365);
    }
  }
  openModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }
}

export default Result;
