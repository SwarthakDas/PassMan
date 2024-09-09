import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
const App = () => {
  return (
    <div>
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-0 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,#d1fae5_100%)]">


      <Navbar/>
      <div className="min-h-[85vh]">
      <Hero/>
      </div>
      <Footer/>
      </div>
    </div>
  )
}

export default App
