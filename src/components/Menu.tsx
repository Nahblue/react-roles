import { Home, Layers3 } from 'lucide-react';
import Link from 'next/link';

export function Menu() {
  
  return(
    <nav className='pt-10 space-y-8 w-full mx-auto border-b-2 border-b-slate-950'>
      <ul className='px-12 flex gap-7 my-1'>
        <Link href="/">
          <li className='flex gap-2 cursor-pointer hover:text-slate-700'>
            <Home /> 
            Dashboard
          </li>
        </Link>

        <Link href="/roles">
          <li className='flex gap-2 cursor-pointer hover:text-slate-700'>
            <Layers3/> 
            Cargos
          </li>
        </Link>
      </ul>
    </nav>
  )
}