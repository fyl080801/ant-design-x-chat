import { ReactNode } from 'react'

interface DesktopLayoutProps {
  children: ReactNode
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className='hidden md:block h-full'>
      <div className='flex min-h-screen h-full'>
        {/* <aside className="w-64 p-4 bg-gray-50 border-r">
          <nav className="flex flex-col gap-2">
            {['Home', 'About', 'Welcome', 'Chat'].map((item) => (
              <a key={item} href={`/${item.toLowerCase()}`} 
                className="px-4 py-2 rounded hover:bg-gray-200">
                {item}
              </a>
            ))}
          </nav>
        </aside> */}
        <main className='flex-1 overflow-hidden'>{children}</main>
      </div>
    </div>
  )
}
