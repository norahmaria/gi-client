import { useState } from 'react'
import '../scss/Tooltip.scss'


const Tooltip = ({ delay, children, content, direction }: { delay?: number, content: string, children: React.ReactChildren | React.ReactChild, direction?: 'left' | 'right' | 'top' | 'bottom' }) => {
  const [active, setActive] = useState(false)
  let timeout: NodeJS.Timeout

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, delay || 400)
  };

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  };

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}>
      {children}
      {active && (
        <div className={`tooltip-Tip ${direction || "top"}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
