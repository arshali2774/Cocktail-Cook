import React from 'react';
import { Link, Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';
const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  console.log(navigation);
  return (
    <div>
      <Navbar />
      <section className='page'>
        {isPageLoading ? <div className='loading' /> : <Outlet />}
      </section>
      <footer>footer</footer>
    </div>
  );
};

export default HomeLayout;
