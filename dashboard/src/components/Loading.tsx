import logo from '../assets/logo.gif';

interface LoadingProps {
  message?: string;
  height?: string | number;
}

export default function Loading({ message = 'Loading details...', height = '300px' }: LoadingProps) {
  return (
    <div className="loading-container-gif" style={{ minHeight: height }}>
      <div className="loading-gif-wrapper">
        <img src={logo} alt="Loading..." className="loading-logo-gif" />
      </div>
      {message && <p className="loading-text">{message}</p>}
    </div>
  );
}
