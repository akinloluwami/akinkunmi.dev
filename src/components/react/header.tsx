import React from 'react'

const Header = () => {
  return (
    <div>
<h1 className='text-3xl mt-20 flex items-center space-x-4'>
  Hello, I am
  <span className='flex items-center space-x-4 ml-2'>
    Akinkunmi.
    <img src="/me.png" alt="Akinkunmi" className='w-10 rotate-6 ml-2 rounded-md'/>
  </span>
</h1>
        <div className="mt-10 space-y-6 text-lg font-light">
          <p>  Welcome to my corner of the internet! I have a passion for solving problems by building impactful software.</p>

          <p>I'm currently working on a new <span className="inline-flex items-center align-middle">
            <img src="/icons/react_dark.svg" alt="React" className="w-5 mr-1" />
            React
            </span> framework - <a href="https://github.com/akinloluwami/react-serve">ReactServe</a>.</p>

          <p>You'll mostly find me working within the <span className="inline-flex items-center align-middle">
            <img src="/icons/typescript.svg" alt="TypeScript" className="w-5 mr-1" />
            TypeScript
            </span>/
            <span className="inline-flex items-center align-middle">
              <img src="/icons/javascript.svg" alt="JavaScript" className="w-5 mr-1" />
              JavaScript
            </span>
             {" "}ecosystem, but I'm also interested in other languages such as Elixir, Rust, and Go.</p>

  <p className='italic'>
             My goal is to be as cracked of an engineer as I can be.
         </p>

        </div>
    </div>
  )
}

export default Header

