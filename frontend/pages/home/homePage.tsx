import Footer from "./footer";
import Hero from "./hero";
import Navbar from "./navbar";

export default function HomePage() {
    return (
      <>
      <Navbar/>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Hero/>
          <Footer/>
          {/* <p>Go to <a href="/admin/login">Login</a> to access the admin panel.</p> */}
        </div>
      </>
    );
  }