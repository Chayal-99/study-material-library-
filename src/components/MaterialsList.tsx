
import React from 'react';
import { MaterialCard } from './MaterialCard';

const sampleMaterials = [
  {
    id: 1,
    title: "Mathematics Textbook",
    subject: "Mathematics",
    category: "textbook",
    downloadCount: 120,
  },
  {
    id: 2,
    title: "Physics Notes",
    subject: "Physics",
    category: "notes",
    downloadCount: 85,
  },
  {
    id: 3,
    title: "Chemistry Lab Guide",
    subject: "Chemistry",
    category: "guide",
    downloadCount: 95,
  }
];

export function MaterialsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sampleMaterials.map((material) => (
        <MaterialCard key={material.id} material={material} />
      ))}
    </div>
  );
}
