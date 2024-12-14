import React from "react";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => (
  <div className="listHeader">
    <h1>{title}</h1>
  </div>
);

export default PageHeader;
