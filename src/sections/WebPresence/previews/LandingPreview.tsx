import type { PreviewPaints } from './PreviewPaints';

export default function LandingPreview({ gradientId }: PreviewPaints) {
  return (
    <>
      <path
        d="M24 56h38"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M24 73h79M24 84h65"
        stroke={`url(#${gradientId})`}
        strokeWidth="5"
        strokeOpacity=".95"
        strokeLinecap="round"
      />
      <path
        d="M24 100h72M24 107h50"
        stroke="#ebe8de"
        strokeOpacity=".3"
        strokeLinecap="round"
      />
      <rect
        x="24"
        y="118"
        width="43"
        height="10"
        rx="3"
        fill={`url(#${gradientId})`}
      />
      <rect
        x="131"
        y="49"
        width="85"
        height="78"
        rx="5"
        fill={`url(#${gradientId})`}
        fillOpacity=".22"
      />
      <circle
        cx="174"
        cy="88"
        r="25"
        stroke={`url(#${gradientId})`}
        strokeOpacity=".9"
      />
      <ellipse
        cx="174"
        cy="88"
        rx="11"
        ry="25"
        stroke={`url(#${gradientId})`}
        strokeOpacity=".9"
      />
      <path
        d="M149 88h50M153 75h42M153 101h42"
        stroke={`url(#${gradientId})`}
        strokeOpacity=".9"
      />
    </>
  );
}
