interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  color?: 'green' | 'orange' | 'blue' | 'purple' | 'pink';
}

export default function StatCard({ icon, label, value, color = 'green' }: StatCardProps) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
    </div>
  );
}