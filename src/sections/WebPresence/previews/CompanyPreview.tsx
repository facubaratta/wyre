import type { PreviewPaints } from './PreviewPaints';

export default function CompanyPreview({ gradientId, tileId }: PreviewPaints) {
  return (
    <>
      <rect
        x="22"
        y="49"
        width="72"
        height="62"
        rx="5"
        fill={`url(#${tileId})`}
        stroke="#e89ac433"
      />
      <circle cx="40" cy="64" r="3" fill="#ffc397" />
      <path
        d="m29 101 20-27 13 17 12-20 14 30Z"
        fill={`url(#${gradientId})`}
        fillOpacity=".65"
      />
      <path
        d="M108 54h91M108 69h76M108 83h86M108 97h59"
        stroke="#ebe8de"
        strokeOpacity=".3"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="22" y="121" width="88" height="11" rx="3" stroke="#e89ac44d" />
      <rect x="124" y="121" width="88" height="11" rx="3" stroke="#e89ac44d" />
    </>
  );
}
