
const Navbar = () => {
  return (
    <div className="flex justify-between bg-[#082f49] text-[#ecfdf5] px-7 py-5 items-center">
        <h1 className="text-2xl font-bold pl-2">
            <span className="">!Pass</span>
            <span className="text-[#34d399]">Man~\</span>
        </h1>
      <ul className="flex gap-2 md:gap-4 font-medium pt-1 text-lg">
        <li>About</li>
        <li>Contact Us</li>
        <div className="flex gap-1 justify-center items-center text-sm">
          <a href="https://github.com/SwarthakDas">
        <img className="invert h-6 ml-2 hover:cursor-pointer" src="/icons/github.svg" alt="github" />
          </a>
        </div>
      </ul>
      
    </div>
  )
}

export default Navbar
