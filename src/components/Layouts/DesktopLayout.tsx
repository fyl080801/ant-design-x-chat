import { ReactNode, useState } from 'react'
import './DesktopLayout.css'
import { Button } from 'antd'
import { RiSidebarFoldLine, RiSidebarUnfoldLine } from 'react-icons/ri'

interface DesktopLayoutProps {
  children: ReactNode
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  return (
    <div className='hidden md:block h-full'>
      <div className='flex min-h-screen h-full'>
        <aside
          className={`h-screen max-h-[100dvh] min-h-screen select-none md:relative transition-all duration-200 ease-in-out shrink-0 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-200 text-sm fixed z-50 top-0 left-0 overflow-x-hidden svelte-141e0sl ${sidebarCollapsed ? 'w-0 max-w-0' : 'w-[260px] max-w-[260px]'}`}
        >
          {/* <div className='w-full h-full flex flex-col'>
            <div className='flex-1 overflow-hidden'>
              <div className='h-full pt-8'>
                <div className='flex flex-col w-full items-start'>
                  <div className='flex w-full max-w-fit items-center gap-2'>
                    <span>对话列表</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </aside>
        <div
          className={`h-screen max-h-[100dvh] transition-all duration-200 ease-in-out w-full max-w-full flex flex-col ${sidebarCollapsed ? 'md:max-w-full' : 'md:max-w-[calc(100%-260px)]'}`}
        >
          <nav className='sticky top-0 z-30 w-full px-1.5 py-1.5 -mb-8 flex items-center drag-region'>
            <div className='bg-linear-to-b via-50% from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 dark:to-transparent pointer-events-none absolute inset-0 -bottom-7 z-[-1]'>
              {/* 遮罩层 */}
            </div>
            <div className='flex max-w-full w-full mx-auto px-1 pt-0.5 bg-transparent'>
              <div className='flex items-center w-full max-w-full'>
                {/*  */}
                <div className='flex-1 overflow-hidden max-w-full py-0.5 ml-1'>
                  <div className='flex flex-col w-full items-start'>
                    <div className='flex w-full max-w-fit items-center gap-2'>
                      <Button
                        type='text'
                        icon={
                          sidebarCollapsed ? (
                            <RiSidebarUnfoldLine
                              style={{ verticalAlign: 'sub', fontSize: '1rem' }}
                            />
                          ) : (
                            <RiSidebarFoldLine style={{ verticalAlign: 'sub', fontSize: '1rem' }} />
                          )
                        }
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      ></Button>
                      <span>新对话</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className='my-0 mx-auto min-w-[1250px] flex-1 overflow-hidden'>{children}</div>
        </div>
      </div>
    </div>
  )
}
