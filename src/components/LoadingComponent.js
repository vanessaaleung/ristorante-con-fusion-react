// inform user the info are loading, functional component

import React from 'react';

export const Loading = () => {
  return (
    <div className="col-12">
      <span className="fa fa-spinner fa-pulse fa-3x fa-fw"></span>
      <p>Loading . . .</p>
    </div>
  );
}