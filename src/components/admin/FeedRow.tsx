interface FeedRowProps {
  color: 'purple' | 'green' | 'gray';
  who: string;
  what: React.ReactNode;
  when: string;
}

export const FeedRow = ({ color, who, what, when }: FeedRowProps): React.JSX.Element => {
  return (
    <div className="feed-row">
      <div className="timeline-marker">
        <div className={`dot ${color === 'purple' ? '' : color}`} />
      </div>
      <div className="body">
        <div className="top">
          <div className="who">{who}</div>
          <div className="when">{when}</div>
        </div>
        <div className="what">{what}</div>
      </div>
    </div>
  );
};
