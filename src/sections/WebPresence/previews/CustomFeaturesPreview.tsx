import type { PreviewPaints } from './PreviewPaints';

export default function CustomFeaturesPreview({ gradientId }: PreviewPaints) {
  return (
    <>
      <rect
        x="22"
        y="49"
        width="47"
        height="78"
        rx="4"
        fill={`url(#${gradientId})`}
        fillOpacity=".22"
      />
      <path
        d="M31 61h28M31 73h20M31 85h24"
        stroke={`url(#${gradientId})`}
        strokeOpacity=".8"
        strokeLinecap="round"
      />
      <rect
        x="82"
        y="49"
        width="135"
        height="18"
        rx="4"
        fill={`url(#${gradientId})`}
        fillOpacity=".14"
      />
      {[80, 101, 122].map((y) => (
        <g key={y}>
          <circle cx="90" cy={y} r="4" stroke={`url(#${gradientId})`} />
          <path d={`M103 ${y}h66`} stroke="#ebe8de" strokeOpacity=".9" />
          <path d={`m199 ${y} 3 3 6-6`} stroke={`url(#${gradientId})`} />
        </g>
      ))}
    </>
  );
}
