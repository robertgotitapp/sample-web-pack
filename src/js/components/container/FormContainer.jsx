import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
import image from "../../../img/image.jpeg"
import image2 from "../../../img/image2.png"

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seo_title: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    const { seo_title } = this.state;
    return (
      <p>
        <img src='https://tylermcginnis.com/would-you-rather/dan.jpg' className="App-logo" alt="logo" />
        <img src='https://tylermcginnis.com/would-you-rather/dan.jpg' className="App-logo" alt="logo" />
        <form id="article-form">
          <Input
            text="SEO title"
            label="seo_title"
            type="text"
            id="seo_title"
            value={seo_title}
            handleChange={this.handleChange}
          />
        </form>
      </p>
    );
  }
}
export default FormContainer;

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;