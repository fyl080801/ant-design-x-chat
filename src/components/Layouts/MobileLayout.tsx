import { ReactNode } from 'react'

interface MobileLayoutProps {
  children: ReactNode
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className='block md:hidden h-full'>
      <div className='flex flex-col min-h-screen h-full'>
        <main className='flex-1 overflow-hidden'>{children}</main>
      </div>
    </div>
  )
}
