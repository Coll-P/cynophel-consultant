import React from 'react';

const Card = ({ children }) => {
  return <div className="p-4 border rounded-lg shadow-md">{children}</div>;
};

const CardContent = ({ children }) => <div className="mt-2">{children}</div>;

const CardDescription = ({ children }) => <p className="text-sm text-gray-600">{children}</p>;

const CardHeader = ({ children }) => <div className="font-bold text-lg">{children}</div>;

const CardTitle = ({ children }) => <h3 className="text-xl font-semibold">{children}</h3>;

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
