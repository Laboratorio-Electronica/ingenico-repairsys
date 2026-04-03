export type GalleryCategory = 'project' | 'event' | 'achievement';

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: GalleryCategory;
}

export const galleryMock: GalleryItem[] = Array.from({ length: 60 }).map(
  (_, i) => ({
    id: i + 1,
    src: `/images/gallery/img-${(i % 6) + 1}.jpg`,
    alt: `Gallery image ${i + 1}`,
    category: ['project', 'event', 'achievement'][i % 3] as GalleryCategory,
  })
);
