import React from 'react';

const Content = ({ paragraphs }) => (
  <React.Fragment>
  {paragraphs.map(paragraph => (
    <React.Fragment>
      <p>{paragraph}</p>
      <br />
    </React.Fragment>
  ))}
  </React.Fragment>
)

export default Content;