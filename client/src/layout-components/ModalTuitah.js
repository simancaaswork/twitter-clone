import * as React from 'react';
import {useAuth} from '../context/authApp/auth-context';

function ModalTuitah({openModal, setOpenModal}) {
  const {sendTuit, user, getUserTuits} = useAuth();

  const [tuit, setTuit] = React.useState('');
  function handleGetTuitText(event) {
    setTuit(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendTuit(tuit);
    setTuit('');
    getUserTuits(user.username);
    setOpenModal(!openModal);
  }

  return (
    <section className="modal-tuith-main">
      <div className="modal-tuith-something">
        <div className="modal-tuith-header">
          <button onClick={() => setOpenModal(!openModal)}>
            <svg viewBox="0 0 24 24" className="close-btn">
              <g>
                <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
              </g>
            </svg>
          </button>
        </div>
        <div className="modal-tuith-body">
          <div className="modal-tuith-image-form">
            <img src={user.avatar} alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={tuit}
              placeholder="What's happening?"
              onChange={e => handleGetTuitText(e)}
            ></textarea>
            <div className="modal-tuithform-actions-user">
              <div className="tuit-form-info-action">
                <div className="emojis-section">
                  <button
                    onClick={() =>
                      alert(
                        'this function is not developed yet, because im working in other projects and i feel that i gonna die when i spend so many hours on VSCODE',
                      )
                    }
                  >
                    <svg viewBox="0 0 24 24" className="emoji-smile">
                      <g>
                        <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
                        <path d="M12 17.115c-1.892 0-3.633-.95-4.656-2.544-.224-.348-.123-.81.226-1.035.348-.226.812-.124 1.036.226.747 1.162 2.016 1.855 3.395 1.855s2.648-.693 3.396-1.854c.224-.35.688-.45 1.036-.225.35.224.45.688.226 1.036-1.025 1.594-2.766 2.545-4.658 2.545z"></path>
                        <circle cx="14.738" cy="9.458" r="1.478"></circle>
                        <circle cx="9.262" cy="9.458" r="1.478"></circle>
                      </g>
                    </svg>
                  </button>
                </div>
                <button type="submit" className="tuitah">
                  Tuith
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ModalTuitah;
