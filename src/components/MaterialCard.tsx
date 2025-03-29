
import React from 'react';

interface Material {
  id: number;
  title: string;
  subject: string;
  category: string;
  downloadCount: number;
}

interface Props {
  material: Material;
  key?: React.Key;
}

export function MaterialCard({ material }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold">{material.title}</h2>
      <p className="text-gray-600">{material.subject}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">Downloads: {material.downloadCount}</span>
        <button 
          onClick={() => alert('Downloading ' + material.title)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download
        </button>
      </div>
    </div>
  );
}
