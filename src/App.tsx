// import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

function App() {
  // const [count, setCount] = useState(0)

  const links = [
    {
      to: '',
      label: 'Home'
    },
    {
      to: '/about',
      label: 'About'
    },
    {
      to: '/welcome',
      label: 'Welcome'
    },
    {
      to: '/chat',
      label: 'Chat'
    }
  ]


  return (
    <div className="p-8">
      <nav className="flex justify-center gap-4 mb-8">
        {links.map((item, index) => <Link key={index} to={item.to} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
          {item.label}
        </Link>)}
      </nav>

      <Outlet />

    </div>
  )
}

export default App
