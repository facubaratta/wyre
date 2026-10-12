import type { PreviewPaints } from './PreviewPaints';

export default function MobilePreview({
  gradientId,
  surfaceId,
}: PreviewPaints) {
  return (
    <>
      <rect
        x="83"
        y="5"
        width="74"
        height="140"
        rx="15"
        fill={`url(#${surfaceId})`}
        stroke={`url(#${gradientId})`}
        strokeOpacity=".8"
      />
      <path
        d="M109 15h22"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="94"
        y="31"
        width="52"
        height="44"
        rx="6"
        fill={`url(#${gradientId})`}
        fillOpacity=".3"
      />
      <circle cx="120" cy="53" r="10" stroke={`url(#${gradientId})`} />
      <path d="m116 53 3 3 6-7" stroke={`url(#${gradientId})`} />
      <path
        d="M95 88h39M95 97h28M95 106h35"
        stroke="#ebe8de"
        strokeOpacity=".4"
        strokeLinecap="round"
      />
      <rect
        x="94"
        y="119"
        width="52"
        height="13"
        rx="4"
        fill={`url(#${gradientId})`}
        fillOpacity=".95"
      />
    </>
  );
}
