import * as React from 'react';
import {years, days, months} from '../../../mock-data';

function ModalForm({setDisableButton, userData, setUserData, errorMsg, error}) {
  const [errors, setErrors] = React.useState({
    notAllowedByAge: false,
  });
  const {notAllowedByAge} = errors;

  function handleDataChange(event) {
    let {name, value} = event.target;
    if (name === 'name' && userData.name.length > 50) {
      let nameForced = userData.name;
      let newnameForced = nameForced.substring(0, nameForced.length - 1);

      setUserData({
        ...userData,
        name: newnameForced,
      });
    } else if (name === 'username') {
      setUserData({
        ...userData,
        username: value.trim(),
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  }

  function handleAgeUser() {
    const {yearBorned} = userData;

    if (parseInt(yearBorned) > 2003) {
      setErrors({...errors, notAllowedByAge: true});
    } else {
      setErrors({...errors, notAllowedByAge: false});
    }
  }

  function activateButton() {
    const {
      name,
      email,
      username,
      monthBorned,
      dayBorned,
      yearBorned,
      password,
    } = userData;
    const {notAllowedByAge} = errors;

    if (
      name !== '' &&
      email !== '' &&
      username !== '' &&
      password !== '' &&
      monthBorned !== null &&
      dayBorned !== null &&
      yearBorned !== null &&
      notAllowedByAge !== true
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }

  React.useEffect(() => {
    handleAgeUser();
    activateButton();
  }, [userData, notAllowedByAge]);

  return (
    <div className="modal-main-form">
      <h2>Create your account</h2>
      <div className="field-input-text-form">
        <div className="input-field-form-special">
          <label htmlFor="name">
            Name
            <span>{userData.name.length}/50</span>
          </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            id="name"
            onChange={handleDataChange}
          />
        </div>
      </div>
      <div className="field-input-text-form">
        <div className="input-field-form-special">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleDataChange}
          />
        </div>
      </div>
      <div className="field-input-text-form">
        <div className="input-field-form-special">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={userData.username}
            onChange={handleDataChange}
          />
        </div>
      </div>
      <div className="field-input-text-form">
        <div className="input-field-form-special">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleDataChange}
          />
        </div>
      </div>
      <div className="date-birth-field">
        <h5>Date of birth</h5>
        <p>
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </p>
        <div className="fields-birth-collection">
          <div className="field-inpit-check-date">
            <label htmlFor="month">Month</label>
            <select name="monthBorned" id="month" onChange={handleDataChange}>
              {months.map(month => (
                <option value={month} key={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="field-inpit-check-date">
            <label htmlFor="day">Day</label>
            <select name="dayBorned" id="day" onChange={handleDataChange}>
              {days.map(day => (
                <option value={day} key={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="field-inpit-check-date">
            <label htmlFor="year">Year</label>
            <select name="yearBorned" id="year" onChange={handleDataChange}>
              {years.map(year => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        {errors.notAllowedByAge && (
          <span className="alert-msg-error">
            You must to have more than 18 years to Join to Tuitah, daaaah.
          </span>
        )}
        {error && <span className="alert-msg-error">{errorMsg}</span>}
      </div>
    </div>
  );
}

export default ModalForm;
