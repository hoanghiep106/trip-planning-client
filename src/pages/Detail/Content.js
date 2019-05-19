import React from 'react';

const Content = ({ paragraphs }) => paragraphs && (
  <React.Fragment>
  {paragraphs.map(paragraph => (
    <div>
      <p>{paragraph}</p>
      <br />
    </div>
  ))}
  </React.Fragment>
)

export default Content;