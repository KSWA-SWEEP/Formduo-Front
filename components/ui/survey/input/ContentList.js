import React from 'react';
import ContentItem from './ContentItem';

const ContentList = ({ qContents, onRemoveContent, onUpdate }) => {
    return (
      <div className="ContentList">
        {qContents.map(qContnet => (
          <ContentItem  
            key={qContnet.qContentId}
            qContentId={qContnet.qContentId}
            qContentVal={qContnet.qContentVal}
            onRemoveContent={onRemoveContent}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    );
  };
  
  export default ContentList;
  