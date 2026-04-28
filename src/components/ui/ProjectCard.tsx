import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  codeSnippet?: string;
  href?: string;
  wide?: boolean;
}

export const ProjectCard = ({
  title,
  description,
  tags,
  image,
  codeSnippet,
  href: _href,
  wide,
}: ProjectCardProps): React.JSX.Element => {
  return (
    <div
      className={`card ${wide ? 'md:col-span-2' : ''}`}
      style={wide ? { gridColumn: 'span 2' } : {}}
    >
      <div
        style={{
          padding: '2rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="flex gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-bold uppercase"
              style={{
                border: '1px solid #eee',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-serif mb-2">{title}</h3>
        <p className="text-secondary text-sm mb-6 flex-grow">{description}</p>

        {codeSnippet && (
          <div
            style={{
              backgroundColor: '#F9FAFB',
              height: '200px',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              marginTop: 'auto',
            }}
          >
            <div
              style={{
                padding: '1rem',
                color: '#666',
                fontFamily: 'monospace',
                fontSize: '10px',
                whiteSpace: 'pre',
              }}
            >
              {codeSnippet}
            </div>
          </div>
        )}

        {image && !codeSnippet && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '200px',
              borderRadius: '8px',
              overflow: 'hidden',
              marginTop: 'auto',
            }}
          >
            <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
          </div>
        )}

        {!codeSnippet && !image && (
          <div className="flex justify-end mt-auto pt-4">
            <span style={{ fontSize: '20px' }}>↗</span>
          </div>
        )}
      </div>
    </div>
  );
};
