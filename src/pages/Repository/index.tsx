import { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useRouteMatch } from 'react-router';
import { RepositoryHEader } from '../../components/RepositoryHeader';
import { RepositoryInfo } from '../../components/RepositoryInfo';
import api from '../../services/api';
import './repository.scss';

type RepositoryParams = {
  repository: string;
};

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

type Issues = {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
};

export function Repository() {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issues[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repository]);

  return (
    <>
      <RepositoryHEader />

      {repository && <RepositoryInfo repository={repository} />}

      <div className="repository-issue">
        {issues.map((issue) => (
          <a
            key={issue.id}
            href={issue.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </div>
    </>
  );
}
