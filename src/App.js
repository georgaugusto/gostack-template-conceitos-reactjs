import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Desafio Node.js ${Date.now()}`,
      url: "https://github.com/georgaugusto/rocketseat/tree/master/semana1/gostack-template-conceitos-nodejs",
      techs: ["Node.js"],
      likes: 0
    });

    const repository = response.data;
    
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (err) {
      alert('Erro ao deletar, tente novamente')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
