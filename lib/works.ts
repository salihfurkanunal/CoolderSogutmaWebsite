export type WorkShot = {
  id: string;
  src: string;
  alt: string;
};

export const WORK_SHOTS: WorkShot[] = Array.from({ length: 23 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `work-${n}`,
    src: `/images/works/work-${n}.webp`,
    alt: `COOLDER saha çalışması ${i + 1}`,
  };
});
