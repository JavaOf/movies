import ContentLoader from 'react-content-loader';

export const SkeletonCard = ({ limit = 6, type}) => {

  return (
    <div className='row'>
      {type === 'banner' ? (
        <ContentLoader
          speed={2}
          width={380}
          height={400}
          viewBox="0 0 240 285"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          className="default-card"
        >
          <rect x="0" y="0" rx="10" ry="10" width="210" height="250" />
          <rect x="0" y="260" rx="5" ry="5" width="140" height="12" />
          <rect x="0" y="280" rx="5" ry="5" width="100" height="12" />
        </ContentLoader>
      ) : (
        <ContentLoader
          speed={2}
          width={180}
          height={300}
          viewBox="0 0 180 300"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          className="default-card"
        >
          <rect x="0" y="0" rx="10" ry="10" width="180" height="250" />
          <rect x="0" y="260" rx="5" ry="5" width="140" height="12" />
          <rect x="0" y="280" rx="5" ry="5" width="100" height="12" />
        </ContentLoader>
      )}
    </div>
  );
};
