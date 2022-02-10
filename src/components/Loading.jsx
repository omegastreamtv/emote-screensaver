const Loading = ({ status }) => (
  <div className="d-flex flex-column justify-content-center align-items-center vw-100 vh-100 m-auto">
    <h1 className="drop-shadow">{status.toUpperCase()}</h1>
  </div>
);

export default Loading;
