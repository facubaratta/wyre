import type { PreviewPaints } from './PreviewPaints';

export default function CommercePreview({ gradientId }: PreviewPaints) {
  return (
    <>
      {[23, 90, 157].map((x) => (
        <g key={x}>
          <rect
            x={x}
            y="49"
            width="60"
            height="56"
            rx="4"
            fill={`url(#${gradientId})`}
            fillOpacity=".25"
          />
          <path
            d={`m${x + 19} 68 11-6 11 6v16l-11 6-11-6Z M${x + 19} 68l11 6 11-6 M${x + 30} 74v16`}
            stroke={`url(#${gradientId})`}
            strokeOpacity=".9"
          />
          <path d={`M${x} 115h30`} stroke="#ebe8de" strokeOpacity=".8" />
          <rect
            x={x + 40}
            y="112"
            width="20"
            height="9"
            rx="3"
            fill={`url(#${gradientId})`}
            fillOpacity=".9"
          />
        </g>
      ))}
    </>
  );
}
