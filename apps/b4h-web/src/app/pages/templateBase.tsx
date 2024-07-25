import React from 'react';

export const PageTemplateBase = ({
  children
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  console.log('Page template base', children);
  return (
    <div>
      <h1>Page template base</h1>
    </div>
  );
};
