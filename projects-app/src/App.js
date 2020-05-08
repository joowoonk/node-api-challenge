import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  console.log(projects);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios("http://localhost:4000/api/project/");
        // console.log({ data });
        setProjects(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       await dispatch(getColleges(educationFormState.searchCollege));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchData();
  // }, [dispatch, educationFormState.searchCollege]);

  return (
    <div>
      <h1>FIRST PROJECT THAT FETCHED DATA FROM SERVEdR ITSELF</h1>

      {projects.map((project) => {
        return (
          <div className="App">
            <h2>Project: {project.name}</h2>
            <p>Description: {project.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
