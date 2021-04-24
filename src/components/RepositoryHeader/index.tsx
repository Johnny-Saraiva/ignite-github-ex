import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import './repository-header.scss';

export function RepositoryHEader() {
  return (
    <header className="repository-header">
      <img src={logo} alt="Github Explorer" />
      <Link to="/">
        <FiChevronLeft size={16} />
        Back
      </Link>
    </header>
  );
}
