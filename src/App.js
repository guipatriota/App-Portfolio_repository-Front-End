import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

// import RepositoriesList from './components/RepositoriesList';

// const id = "123";
// const title = "Título de teste";
// const url = "https://github.com";
// const techs = ["ReactJS", "AXIOS", "JS"];


function App() {
  const [repositories, setRepositories] = useState([]);
  //console.log(repositories.length);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  // useEffect(() => {
  //   api.get('repositories').then(response => {
  //     setRepositories(response.data);
  //   });
  // }, [repositories]);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      // id: id,
      // title: title,
      // url: url,
      // techs: techs
    
      title: "Título de teste",
      url: "https://github.com",
      techs: ["ReactJS", "AXIOS", "JS"],
    });

    const repository = response.data;
    //console.log(repository);
    setRepositories([...repositories, repository]);
  };

  async function handleRemoveRepository(id) {
    // const delete_repository = await api.delete(`/repositories/${id}`)
    const repository = await api.get("repositories", {query:{id:id}})
    
    // .then(response => {
    //   console.log(response.data);
    //   setRepositories(response.data)
    // });
    if(repository.status === 200) {
      //console.log(repository.data)
      await api.delete(`repositories/${id}`).then(response => {
        console.log(response.data);
        // const newRepositories = repositories.map(repo => {
        //   return repo.id === !id ? {...repo} : []
        // })
        const newRepositories = repositories.filter(repo => repo.id !== id);
        setRepositories(newRepositories);
      });
    }
    // if(delete_repository.data === "") {

    // await api.get("repositories").then(response => {
    //   console.log(response.data);
    //   setRepositories(response.data)
    // });

    // );
  // };
  };

  return (
    <div>
      {/* <RepositoriesList title="Repositories list"/> */}
        
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
