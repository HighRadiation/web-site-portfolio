interface TimelineItem {
  date: string;
  role: string;
  company: string;
  desc: string;
}

const experiences: TimelineItem[] = [
  {
    date: '2024 – PRESENT',
    role: 'Confidential Stealth Project',
    company: 'Systems & Backend Architecture',
    desc: 'Developing backend systems and scalable infrastructure.',
  },
  {
    date: '2024 – PRESENT',
    role: 'Visual & Interface Design',
    company: 'Independent Product Design',
    desc: 'Designed UI/UX systems and prototypes in Figma for my own projects.',
  },
  {
    date: '2024 – PRESENT',
    role: 'Independent Developer',
    company: 'Mobile-Web Research',
    desc: 'Focusing on mobile-web development and AI management.',
  },
];

const education: TimelineItem[] = [
  {
    date: '2024 – PRESENT',
    role: 'Industrial Design (BSc)',
    company: '1st Year Student',
    desc: 'Studying design thinking and functional aesthetics.',
  },
  {
    date: '2024 – 2025',
    role: '42 Istanbul',
    company: '1-Year Intensive Training',
    desc: 'Focused on C, Unix systems, and low-level algorithms.',
  },
  {
    date: 'HIGH SCHOOL',
    role: 'Vocational High School',
    company: 'Map, Land Registry & Cadastre',
    desc: 'Studied official data management and documentation.',
  },
];

function renderTimeline(items: TimelineItem[]): React.JSX.Element {
  return (
    <div className="timeline-list">
      {items.map((item) => (
        <div key={item.role} className="timeline-item">
          <span className="timeline-date">{item.date}</span>
          <h4 className="timeline-role">{item.role}</h4>
          <p className="timeline-company">{item.company}</p>
          <p className="timeline-desc">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export const TimelineSection = (): React.JSX.Element => {
  return (
    <section className="section-alt">
      <div className="container">
        <div className="timeline-grid">
          <div id="experience">
            <div className="timeline-section-title">
              <span>Experience</span>
            </div>
            {renderTimeline(experiences)}
          </div>
          <div id="education">
            <div className="timeline-section-title">
              <span>Education</span>
            </div>
            {renderTimeline(education)}
          </div>
        </div>
      </div>
    </section>
  );
};
