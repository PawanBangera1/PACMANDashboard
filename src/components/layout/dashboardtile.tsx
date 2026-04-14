import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type DashboardTileProps = {
  title: string;
  icon: ReactNode;
  mainVal: string;
  subLabel: string;
  isActive: boolean;
  gridClass: string;
  onClick: () => void;
  children?: ReactNode;
  footerContent?: ReactNode;
};

export default function DashboardTile({
  title,
  icon,
  mainVal,
  subLabel,
  isActive,
  gridClass,
  onClick,
  children,
  footerContent,
}: DashboardTileProps) {
  const hasMultiLineSubLabel = subLabel.includes('\n');
  const [animatedMainVal, setAnimatedMainVal] = useState(mainVal);

  useEffect(() => {
    if (!isActive) {
      setAnimatedMainVal(mainVal);
      return;
    }

    const parts = mainVal.match(/^([^\d.-]*)(-?\d+(?:\.\d+)?)(.*)$/);
    if (!parts) {
      setAnimatedMainVal(mainVal);
      return;
    }

    const prefix = parts[1] ?? '';
    const rawNum = parts[2] ?? '0';
    const suffix = parts[3] ?? '';
    const target = Number(rawNum);
    if (!Number.isFinite(target)) {
      setAnimatedMainVal(mainVal);
      return;
    }

    const decimals = (rawNum.split('.')[1] ?? '').length;
    const duration = 100;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = target * progress;
      const valueText = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
      setAnimatedMainVal(`${prefix}${valueText}${suffix}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isActive, mainVal]);

  const isCompactCard = gridClass.includes('h-[90px]');
  const useRowLayout = !isActive && isCompactCard;
  const hideMainValueBlock = isActive && title === 'Compliance';

  return (
    <motion.div
      layout
      transition={{ layout: { type: 'tween', duration: 0.3, ease: 'linear' } }}
      onClick={onClick}
      className={`col-span-12 flex cursor-pointer flex-col overflow-hidden rounded-sm border border-gray-100 bg-white p-6 shadow-sm ${gridClass} ${isActive ? 'z-10 ring-1 ring-[#e91e85]/20' : 'z-0'}`}
    >
      <div className={`flex h-full ${useRowLayout ? 'flex-row items-center justify-between text-left' : 'flex-col text-center'}`}>
        <div
          className={`flex items-center space-x-2 text-sm font-bold uppercase text-gray-500 ${
            useRowLayout ? 'mb-0 justify-start' : 'mb-2 justify-center md:mb-4'
          }`}
        >
          {icon} <span>{title}</span>
        </div>

        {children}

        {!hideMainValueBlock && (
          <div
            className={`flex ${
              useRowLayout
                ? 'w-auto items-center justify-end text-right'
                : `mt-auto w-full flex-col ${isActive ? 'items-start px-6 text-left' : 'items-center text-center'}`
            }`}
          >
            <div className="inline-flex items-center w-fit flex-nowrap gap-1 whitespace-nowrap">
              <h2 className="shrink-0 text-3xl font-bold text-[#e91e85]">{isActive ? animatedMainVal : mainVal}</h2>
              <span
                className={`shrink-0 text-left font-semibold text-[#e91e85] ${
                  hasMultiLineSubLabel ? 'whitespace-pre-line leading-tight' : 'whitespace-nowrap leading-none'
                } text-[10px]`}
              >
                {subLabel}
              </span>
            </div>
            {!useRowLayout ? footerContent : null}
          </div>
        )}
      </div>
    </motion.div>
  );
}
