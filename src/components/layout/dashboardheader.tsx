import { Filter } from 'lucide-react'

const Dashboardheader = () => {
  return (
     <div className="mx-auto mb-4 overflow-hidden border border-slate-300/80 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_auto] gap-0 items-stretch">
          
          <div className="flex items-center gap-3 px-5 py-3 md:py-4">
            <Filter className="h-4 w-4 text-pink-600 flex-shrink-0" />
            <h1 className="text-xs md:text-sm font-bold uppercase text-slate-900">All Applications</h1>
          </div>

          <div className="flex items-center justify-center gap-6 px-5 py-3 md:py-4 text-xs">
            <span className='text-slate-900 font-semibold text-xs md:text-xs'>APPLICATION STATUS :</span>
            <div className='flex gap-6'>
              <div className='flex items-center gap-2'>
                <span className="text-pink-600 font-bold text-xs">43</span>
                <span className='text-slate-500 text-[10px] md:text-[11px]'>PRODUCTION</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className="text-pink-600 font-bold text-xs">7</span>
                <span className='text-slate-500 text-[10px] md:text-[11px]'>BUILD</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className="text-pink-600 font-bold text-xs">5</span>
                <span className='text-slate-500 text-[10px] md:text-[11px]'>INTAKE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 px-5 py-3 md:py-4 bg-[#2f3135] md:border-l border-slate-300">
            <span className="text-xs md:text-sm font-semibold uppercase text-white">SECURITY</span>
            <span className="h-4 w-4 rounded-full bg-lime-400" />
          </div>
        </div>
      </div>
  )
}

export default Dashboardheader