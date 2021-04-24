import './dashboard.scss';
import logo from '../../assets/logo.svg';
import { FormEvent, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

type Repository = {
  id: number;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
};

export function Dashboard() {
  const [newRepository, setNewRepository] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleAddRepository = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!newRepository) {
      setInputError('You need to enter the author/name of the repository.');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepository}`);
      const repository = response.data;

      const checkIfRepositoryExists = repositories.find(
        (repo) => repo.full_name === newRepository,
      );

      if (checkIfRepositoryExists) {
        setInputError('Repository already searched.');
        return;
      }

      setRepositories([...repositories, repository]);
      setNewRepository('');
      setInputError('');
    } catch (error) {
      setInputError(
        'Error searching this repository, please enter author/name  of the repository.',
      );
    }
  };

  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <h1 className="dashboard-title">Find your repository on Github</h1>

      <form className="dashboard-form" onSubmit={handleAddRepository}>
        <input
          value={newRepository}
          type="text"
          placeholder="Enter the author/name of the repository"
          onChange={(event) => setNewRepository(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {inputError && <span className="dashboard-error">{inputError}</span>}

      <div className="dashboard-repositories">
        {repositories.map((repository) => (
          <Link
            key={repository.id}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </div>
    </>
  );
}
