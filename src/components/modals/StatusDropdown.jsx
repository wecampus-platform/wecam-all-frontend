import { useState, useRef, useEffect } from 'react';
import styles from '@/app/components/modals/StatusDropdown.module.css';

const statusOptions = [
  { value: 'NOT_STARTED', label: '진행 전', className: 'chipstatus' },
  { value: 'IN_PROGRESS', label: '진행 중', className: 'chipstatus1' },
  { value: 'COMPLETED', label: '진행 완료', className: 'chipstatusGreen' }, // 커스텀 추가 가능
];



export function StatusDropdown({ currentStatus, onUpdate }) {
  const [status, setStatus] = useState(currentStatus);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const normalizedStatus = status?.toUpperCase()?.trim();
  const selected = statusOptions.find((s) => s.value === normalizedStatus);

  const filtered = statusOptions.filter((s) => s.value !== status);
console.log('필터된 드롭다운 옵션:', filtered);
console.log('chipstatus1:', styles['chipstatus1']);


const handleClick = async (newStatus) => {
  if (newStatus === status) return;

  try {
    const result = await onUpdate(newStatus);
    if (!result) {
      alert('상태 변경 실패 ❌');
      return;
    }

    setStatus(newStatus);
    setOpen(false);
    alert('상태가 저장되었습니다. ✅');
  } catch {
    alert('상태 변경 실패 ❌');
  }
};

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={styles[selected?.className ?? 'chipstatus']}
      >
        {selected?.label ?? '진행 상태'}
      </button>

      {open && (
        <div className={`relative mt-2 z-10 ${styles.chipstatusParent}`}>
          {statusOptions
            .filter((s) => s.value !== normalizedStatus)
            .map((option) => (
              <button
                key={option.value}
                onClick={() => handleClick(option.value)}
                className={styles[option.className]}
              >
                {option.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
