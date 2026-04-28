import { createClient } from '@/lib/supabase/server';

interface TimelineItem {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
  type: string;
}

function renderTimeline(items: TimelineItem[]): React.JSX.Element {
  if (!items || items.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }}>No data available.</p>;
  }

  return (
    <div className="timeline-list">
      {items.map((item) => (
        <div key={item.id} className="timeline-item">
          <span className="timeline-date">{item.date}</span>
          <h4 className="timeline-role">{item.role}</h4>
          <p className="timeline-company">{item.company}</p>
          <p className="timeline-desc">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export const TimelineSection = async (): Promise<React.JSX.Element> => {
  const supabase = await createClient();
  const { data: timelineData } = await supabase
    .from('timeline')
    .select('*')
    .order('created_at', { ascending: true });

  const items = (timelineData as TimelineItem[]) || [];
  const experiences = items.filter((i: TimelineItem) => i.type === 'experience');
  const education = items.filter((i: TimelineItem) => i.type === 'education');

  return (
    <section id="experience" className="section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Experience & Education</h2>
        </div>

        <div className="timeline-grid">
          <div>
            <h3 className="timeline-title">Experience</h3>
            {renderTimeline(experiences)}
          </div>
          <div>
            <h3 className="timeline-title">Education</h3>
            {renderTimeline(education)}
          </div>
        </div>
      </div>
    </section>
  );
};
