import { Outlet } from 'react-router-dom'
import './App.css'
import './index.css'
import { MobileLayout, DesktopLayout } from './components/Layouts'
import { SessionProvider } from './hooks'

function App() {
  const links = [
    {
      to: '',
      label: 'Home',
    },
    {
      to: '/about',
      label: 'About',
    },
    {
      to: '/welcome',
      label: 'Welcome',
    },
    {
      to: '/chat',
      label: 'Chat',
    },
  ]

  return (
    <SessionProvider>
      <MobileLayout>
        {/* <nav className="flex justify-center gap-4 mb-8">
          {links.map((item, index) => (
            <a key={index} href={item.to} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
              {item.label}
            </a>
          ))}
        </nav> */}
        <Outlet />
      </MobileLayout>

      <DesktopLayout>
        <Outlet />
      </DesktopLayout>
    </SessionProvider>
  )
}

export default App
