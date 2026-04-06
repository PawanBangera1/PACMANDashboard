type DotStatus = 'green' | 'yellow' | 'red';

const rows: DotStatus[][] = [
  ['green', 'green', 'green', 'green', 'green', 'red', 'green', 'green'],
  ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green'],
  ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green'],
  ['green', 'green', 'yellow', 'green', 'green', 'green', 'green', 'green'],
  ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green'],
  ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green'],
];

const statusStyles: Record<DotStatus, { outer: string; ring1: string; ring2: string; core: string }> = {
  green: {
    outer: 'border-[#b7e2a0]',
    ring1: 'border-[#9fd681]',
    ring2: 'border-[#8dca6a]',
    core: 'bg-[#68bf2a]',
  },
  yellow: {
    outer: 'border-[#f2d87b]',
    ring1: 'border-[#eecb51]',
    ring2: 'border-[#e9be2e]',
    core: 'bg-[#e4b500]',
  },
  red: {
    outer: 'border-[#f4aaa5]',
    ring1: 'border-[#f0837a]',
    ring2: 'border-[#eb5f52]',
    core: 'bg-[#eb1b10]',
  },
};

function StatusDot({ status }: { status: DotStatus }) {
  const s = statusStyles[status];

  return (
    <div className={`relative h-9 w-9 rounded-full border ${s.outer}`}>
      <div className={`absolute inset-[3px] rounded-full border ${s.ring1}`} />
      <div className={`absolute inset-[7px] rounded-full border ${s.ring2}`} />
      <div className={`absolute inset-[10px] rounded-full ${s.core}`} />
    </div>
  );
}

export default function MonitoringGraph() {
  return (
    <div className="w-full bg-white px-8 py-2 md:py-2">
      <div className="space-y-1">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 place-items-center gap-y-1 md:grid-cols-8">
            {row.map((status, idx) => (
              <StatusDot key={`${rowIndex}-${idx}`} status={status} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
