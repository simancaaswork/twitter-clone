import * as React from 'react';
import LoginInfo from './components/LoginInfo';
import Footer from './components/Footer';
import ModalSignUp from './components/ModalSignUp';

function HomePage() {
  const [openModal, setOpenModal] = React.useState(false);
  function handleOpenModal() {
    setOpenModal(openModal ? false : true);
  }

  return (
    <main className="wrapper-login-signup">
      <LoginInfo handleOpenModal={handleOpenModal} />
      <Footer />
      {openModal ? (
        <ModalSignUp handleOpenModal={handleOpenModal} openModal={openModal} />
      ) : null}
    </main>
  );
}

export default HomePage;
