import { Card } from './Card';

export default function Example() {
  return (
    <div className="p-8">
      <Card
        title="Judul Artikel"
        description="Ini adalah deskripsi singkat dari artikel yang menjelaskan konten secara ringkas."
        date="01 September 2024"
        imageUrl="/path/to/image.jpg"
      />
    </div>
  );
}

