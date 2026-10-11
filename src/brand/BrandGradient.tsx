import { BRAND_STOPS } from './colors';
export default function BrandGradient({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        {BRAND_STOPS.map(({ offset, color }) => (
          <stop key={offset} offset={offset} stopColor={color} />
        ))}
      </linearGradient>
    </defs>
  );
}
