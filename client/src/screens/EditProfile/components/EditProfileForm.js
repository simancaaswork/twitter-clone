import img from '../../../assets/imgs/users/1.jpg';

function EditProfileForm({userModified, onChange, handleOnSubmit, loading}) {
  let disabled = userModified.name === '';
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="configure-profile-layout">
        <div className="img-preview-change">
          <img src={userModified.avatar} alt="" />
          <label
            htmlFor="input-image"
            onClick={() =>
              alert(
                'this function is not developed yet, because im working in other projects and i feel that i gonna die when i spend so many hours on VSCODE',
              )
            }
          >
            <svg viewBox="0 0 24 24" className="camera-edit">
              <g>
                <path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path>
                <path d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path>
              </g>
            </svg>
          </label>
        </div>
      </div>
      <div className="field-input-text-form">
        <div className="input-field-form-special">
          <label htmlFor="name">
            Name
            <span>0/50</span>
          </label>
          <input
            type="text"
            name="name"
            onChange={onChange}
            defaultValue={userModified.name}
            id="name"
          />
        </div>
        {userModified.name === '' && (
          <span className="alert-msg-error">
            You need to have a display name
          </span>
        )}
      </div>
      <div className="field-input-text-form">
        <div className="input-field-form-special">
          <label htmlFor="bio">
            Bio
            <span>0/160</span>
          </label>
          <textarea
            name="bio"
            onChange={onChange}
            id="bio"
            defaultValue={userModified.bio}
          ></textarea>
        </div>
      </div>
      <div className="field-input-text-form">
        <div className="input-field-form-special">
          <label htmlFor="location">
            Location
            <span>0/30</span>
          </label>
          <input
            type="text"
            name="location"
            onChange={onChange}
            id="location"
            defaultValue={userModified.location}
          />
        </div>
      </div>
      <button disabled={loading ? loading : disabled} type="submit">
        Save
      </button>
    </form>
  );
}

export default EditProfileForm;
