import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export function Layout() {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          style: {
            background: '#363636',
            color: '#fff'
          },

          // Default options for specific types
          success: {
            duration: 3000,
            // @ts-ignore
            theme: {
              primary: 'green',
              secondary: 'black'
            }
          }
        }}
      />
    </div>
  );
}