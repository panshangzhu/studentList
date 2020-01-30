import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export class Student extends Component {
  constructor() {
    super();
    this.state = {
      showGrade: false,
      tag: "",
      tags: []
    };
    this.gradeShow = this.gradeShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addStudentTag = this.addStudentTag.bind(this);
  }
  componentDidMount(){
    this.setState({tags:this.state.tags.concat(this.props.student.tags)});
  }
  gradeShow() {
    this.setState({ showGrade: !this.state.showGrade });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addStudentTag(e, key) {
    e.preventDefault();
    this.setState(
      {
        tags: this.state.tags.concat(this.state.tag)
      },
      () => {
        this.props.addTag(key, this.state.tags);
      }
    );
    this.setState({tag:""});
  }
  render() {
    const plus = <FontAwesomeIcon icon={faPlus} />;
    const minus = <FontAwesomeIcon icon={faMinus} />;
    return (
      <div className="studentContainer">
        <button onClick={this.gradeShow} className="expand-btn">
          {this.state.showGrade === true ? (
            <div>{minus}</div>
          ) : (
            <div>{plus}</div>
          )}
        </button>
        <img src={this.props.student.pic} alt="profile" />
        <h2>{this.props.student.name}</h2>
        <h3>Email:{this.props.student.email}</h3>
        <h3>Company:{this.props.student.company}</h3>
        <h3>Skill:{this.props.student.skill}</h3>
        <h3>Average:{this.props.student.average}</h3>

        {this.state.showGrade === true ? (
          <div>
            <div>
              {this.props.student.grades.map((grade, index) => (
                <h5 key={index}>
                  <span>Test{index + 1}: </span> {grade}%
                </h5>
              ))}
            </div>
            <form onSubmit={e => this.addStudentTag(e, this.props.student.key)}>
              <input
                className="add-tag-input"
                type="text"
                value={this.state.tag}
                name="tag"
                onChange={e => this.handleChange(e)}
              />
              <button type="submit">New Tag</button>
            </form>
            {this.props.student.tags.length === 0 ? null : (
              <div>
                {this.props.student.tags.map(tag => (
                  <h5 key={tag}>{tag}</h5>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Student;
