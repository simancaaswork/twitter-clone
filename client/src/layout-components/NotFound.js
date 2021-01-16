function NotFound({msg}) {
  return (
    <div className="not-found-component">
      <h2>{msg ? msg : 'Not found'}</h2>
    </div>
  );
}

export default NotFound;
