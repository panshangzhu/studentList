import React, { useState, useEffect } from "react";
import axios from "axios";
import Student from "./components/Student";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [searchStudents, setSearchStudents] = useState([]);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    axios.get("https://www.hatchways.io/api/assessment/students").then(res => {
      const studentsData = res.data.students;
      studentsData.forEach(s => {
        const avg = `${s.grades.reduce((a, b) => Number(a) + Number(b)) /
          s.grades.length}%`;
        const student = {
          pic: s.pic,
          firstname: s.firstName,
          lastname: s.lastName,
          name: `${s.firstName} ${s.lastName}`,
          company: s.company,
          email: s.email,
          skill: s.skill,
          grades: s.grades,
          average: avg,
          key: s.id,
          tags: []
        };
        setStudents(students => [...students, student]);
        setSearchStudents(students => [...students, student]);
      });
    });
  }, []);

  useEffect(() => {
    var result = students.filter(s => s.name.toLowerCase().includes(name));
    if (tag.length !== 0) {
      result = result.filter(s => s.tags.includes(tag));
    }
    setSearchStudents(result);
  }, [name, tag]);

  const NameSearch = e => {
    const newName = e.target.value.toLowerCase();
    setName(newName);
  };

  const TagSearch = e => {
    setTag(e.target.value.toLowerCase());
  };

  const addTag = (id, tags) => {
    const newStudents = Array.from(students);
    newStudents[id - 1].tags = tags;
    setStudents(newStudents);
  };
  return (
    <div className="container">
      <h2>Students System</h2>
      <form className="search">
        <input
          id="name-input"
          type="text"
          value={name}
          placeholder="Search Name"
          onChange={NameSearch}
        />
        <br />
        <input
          id="tag-input"
          type="text"
          value={tag}
          placeholder="Search tag"
          onChange={TagSearch}
        />
      </form>
      <div className="studentsContainer">
        {searchStudents.map(s => (
          <Student key={s.key} student={s} addTag={addTag} />
        ))}
      </div>
    </div>
  );
}

export default App;
