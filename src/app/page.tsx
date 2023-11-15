import PromptBox from '@/components/PromptBox'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex gap-y-10 min-h-screen w-full flex-col items-center justify-center
     bg-gradient-to-tr from-blue-300 to-indigo-300">
      <h1 className='text-4xl font-bold text-blue-950'>Quick URL Summary</h1>
      <PromptBox/>
   
    </main>
  )
}
