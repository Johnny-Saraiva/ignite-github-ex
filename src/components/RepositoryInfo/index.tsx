import './repository-info.scss';

type Repository = {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
};

interface RepositoryInfoProps {
  repository: Repository;
}
export function RepositoryInfo({ repository }: RepositoryInfoProps) {
  return (
    <section className="repository-info">
      <header>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <div>
          <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>
      </header>
      <ul>
        <li>
          <strong>{repository.stargazers_count}</strong>
          <span>Stars</span>
        </li>
        <li>
          <strong>{repository.forks_count}</strong>
          <span>Forks</span>
        </li>
        <li>
          <strong>{repository.open_issues_count}</strong>
          <span>Issues abertas</span>
        </li>
      </ul>
    </section>
  );
}
