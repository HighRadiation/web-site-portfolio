interface StatCardProps {
  label: string;
  value: number;
  delta: string;
  hint: string;
  icon: React.ReactNode;
  spark: number[];
  trend: 'up' | 'flat';
}

export const StatCard = ({
  label,
  value,
  delta,
  hint,
  icon,
  spark,
  trend,
}: StatCardProps): React.JSX.Element => {
  const w = 80;
  const h = 28;
  const max = Math.max(...spark, 1);
  const pts = spark
    .map((v, i) => {
      const x = (i / Math.max(spark.length - 1, 1)) * w;
      const y = h - (v / max) * (h - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const gradId = `sp-${label.replace(/\s+/g, '-')}`;

  return (
    <div className="stat-card">
      <div className="icon-wrap">{icon}</div>
      <svg className="spark" viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(167,139,250,0.45)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0)" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          points={pts}
          style={{ color: 'var(--accent)' }}
        />
        <polygon fill={`url(#${gradId})`} points={`0,${h} ${pts} ${w},${h}`} />
      </svg>
      <div className="label">{label}</div>
      <div className="value">
        {value}
        <span className={`delta ${trend}`}>{delta}</span>
      </div>
      <div className="meta">{hint}</div>
    </div>
  );
};
