import { Filter } from 'lucide-react'

const Dashboardheader = () => {
  return (
     <div className="mx-auto mb-4 overflow-hidden bg-white shadow-lg rounded-sm">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_auto] gap-0 items-stretch">
          
          <div className="flex items-center gap-3 px-2">
            <Filter className="h-4 w-4 text-pink-600 flex-shrink-0" />
            <h1 className="text-[10px] md:text-[11px] font-bold uppercase font-['Montserrat'] text-slate-900">All Applications</h1>
          </div>

          <div className="flex items-center justify-center gap-6 px-5 py-2 text-xs">
            <hr className="h-full w-[1px]  bg-slate-600" />
            <span className='text-slate-800 font-semibold text-[10px] md:text-[11px]'>APPLICATION STATUS :</span>
            <div className='flex gap-6'>
              <div className='flex items-center gap-2'>
                <span className="text-pink-600 font-bold text-xs">43</span>
                <span className='text-slate-500 font-semibold text-[10px] md:text-[11px]'>PRODUCTION</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className="text-pink-600 font-bold text-xs">7</span>
                <span className='text-slate-500 font-semibold text-[10px] md:text-[11px]'>BUILD</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className="text-pink-600 font-bold text-xs">5</span>
                <span className='text-slate-500 font-semibold text-[10px] md:text-[11px]'>INTAKE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 px-5 py-1 md:py-3 bg-[#3c3c3c] md:border-l border-slate-300">
            <span className="text-[10px] md:text-[11px] font-semibold uppercase text-white">SECURITY</span>
            <span className="h-4 w-4 rounded-full bg-lime-400" />
          </div>
        </div>
      </div>
  )
}

export default Dashboardheader