import React, {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  const fetchStatus = _ => {
    setLoading(true);
    fetch(`https://api.github.com/status`)
      .then(res =>
        setStatus({text: 'GitHub is Alive!', time: new Date(), code: 200}),
      )
      .catch(error =>
        setStatus({
          text: 'oh, no! all my code and dreams....😢',
          time: new Date(),
          code: 400,
        }),
      )
      .finally(_ => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchStatus();
  }, []);

  const timeFormat = {
    timeZoneName: 'long',
    weekday: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return (
    <div className="App">
      <h1>GitHub Status Checker</h1>
      {status && (
        <output>
          <div
            className="content"
            data-testid="status"
            data-label={status.code}>
            <span>{status.text}</span>
          </div>
          <div
            className="content"
            data-testid="status-time"
            data-label="Checked on">
            <span>
              {new Intl.DateTimeFormat('en-GB', timeFormat).format(status.time)}
            </span>

            <button
              type="button"
              disabled={loading}
              onClick={_ => fetchStatus()}>
              Refresh
            </button>
          </div>
        </output>
      )}
    </div>
  );
};
export default App;
