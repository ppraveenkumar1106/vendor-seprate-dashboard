
import React from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Footer from './components/Footer';
import Main from './components/Main'

function Home({ children }) {
  return (
    <>
      <Header />
      <SideBar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

export default Home;
