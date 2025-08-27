'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './dashboardSummary.module.css';
import { fetchTodoSummary } from '@/api-service/adminTodoApi';
import { useAuthStore } from '@/store/authStore';

const DashboardSummary = () => {
  const { accessToken, councilList } = useAuthStore();
  const councilName = councilList?.[0]?.name || '위캠퍼스';
  const councilId = councilList?.[0]?.id || 2;

  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (!accessToken || !councilName || !councilId) return;
    
    fetchTodoSummary(accessToken, councilName, councilId)
      .then(setSummary)
      .catch((err) => {
        console.error('요약 정보 가져오기 실패:', err);
        setSummary(null);
      });
  }, [accessToken, councilName, councilId]);

  if (!summary) return null;
  
  // summary 객체의 속성들이 존재하는지 확인
  const todayTodo = summary.todayTodo || {};
  const weekTodo = summary.weekTodo || {};
  const receivedTodo = summary.receivedTodo || {};
  const sentTodo = summary.sentTodo || {};
  
  return (
    <div className={styles.wrapper}>
      <SummaryCard title="오늘의 할 일" left={todayTodo.done || 0} right={`${todayTodo.total || 0}`} />
      <SummaryCard
        title="이번 주 현황 및 완료율"
        left={`${weekTodo.done || 0} / ${weekTodo.total || 0}`}
        right={`${weekTodo.rate || 0}%`}
      />
      <SummaryCard title="받은 일 현황" left={receivedTodo.done || 0} right={`${receivedTodo.total || 0}`} />
      <SummaryCard title="보낸 일 현황" left={sentTodo.done || 0} right={`${sentTodo.total || 0}`} />
    </div>
  );
};

export default DashboardSummary;

const SummaryCard = ({ title, left, right, badge, badgeCount }) => {
  return (
      <div className={styles.parent}>
        {/* ✅ 제목 */}
        <div className={styles.div}>{title}</div>

        {/* ✅ 숫자 */}
        <div className={styles.group}>
          <b className={styles.b}>{left}</b>
          <Image className={styles.lineIcon} width={6} height={10} sizes="100vw" alt="" src="/todo/Line36.svg" />);
          <div className={styles.div1}>{right}</div>
        </div>

        {/* ✅ badge가 있는 경우만 표시 */}

        {(badge || badgeCount) && (
          <div className={styles.badgeRow}>
            {badge && <span className={styles.badge}>{badge}</span>}
            {badgeCount && <span className={styles.badgeCount}>{badgeCount}</span>}
          </div>
        )}
      </div>
  );
};
