import React from 'react'
import { Filter } from 'lucide-react'

const Dashboardheader = () => {
  return (
     <div className="max-w-7xl mx-auto m-6 overflow-hidden border border-slate-300/80 bg-white shadow-sm">
        <div className="grid grid-cols-1 items-stretch lg:grid-cols-[1fr_1.05fr_auto]">
          <div className="flex items-center gap-3 px-5 py-3">
            <Filter className="h-5 w-5 text-pink-600" />
            <h1 className="text-sm font-bold uppercase font-family-'Montserrat' text-slate-900">All Applications</h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 px-5 py-4 text-sm ">
            <span className='text-slate-900'>APPLICATION STATUS :</span>
            <div className='flex justify-between gap-2'>
            <span className="text-pink-600">43</span>
            <span className='text-slate-500'>PRODUCTION</span>
            </div>
            <div className='flex justify-between gap-2'>
            <span className="text-pink-600">7</span>
            <span className='text-slate-500'>BUILD</span>
            </div>
            <div className='flex justify-between gap-2'>
            <span className="text-pink-600">5</span>
            <span className='text-slate-500'>INTAKE</span>
            </div>
          </div>

          <div className="flex min-w-[160px] items-center justify-center gap-3 border-t border-slate-300 bg-[#2f3135] px-5 py-4">
            <span className="text-sm font-semibold uppercase text-white">Security</span>
            <span className="h-4 w-4 rounded-full bg-lime-400" />
          </div>
        </div>
      </div>
  )
}

export default Dashboardheader