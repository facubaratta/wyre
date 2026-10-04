import Box from '@mui/material/Box';

/** Decorative interface sketches; service names remain the accessible labels. */
export default function WebPresencePreview({ kind }: { kind: number }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        color: 'var(--accent)',
        width: '100%',
        maxWidth: kind === 0 ? 340 : 180,
        mx: 'auto',
      }}
    >
      <svg
        viewBox={kind === 4 ? '75 0 90 150' : '0 0 240 150'}
        fill="none"
        width="100%"
        style={{ display: 'block' }}
      >
        {kind === 4 ? (
          <>
            <rect
              x="83"
              y="5"
              width="74"
              height="140"
              rx="15"
              fill="#222522"
              stroke="currentColor"
              strokeOpacity=".5"
            />
            <path
              d="M109 15h22"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <rect
              x="94"
              y="31"
              width="52"
              height="44"
              rx="6"
              fill="currentColor"
              fillOpacity=".18"
            />
            <circle cx="120" cy="53" r="10" stroke="currentColor" />
            <path d="m116 53 3 3 6-7" stroke="currentColor" />
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
              fill="currentColor"
              fillOpacity=".6"
            />
          </>
        ) : (
          <>
            <rect
              x="8"
              y="15"
              width="224"
              height="126"
              rx="8"
              fill="#222522"
              stroke="currentColor"
              strokeOpacity=".35"
            />
            <path d="M8 35h224" stroke="currentColor" strokeOpacity=".2" />
            {[19, 27, 35].map((x) => (
              <circle
                key={x}
                cx={x}
                cy="25"
                r="2"
                fill="currentColor"
                fillOpacity=".5"
              />
            ))}
            <rect
              x="83"
              y="22"
              width="80"
              height="6"
              rx="3"
              fill="#ebe8de"
              fillOpacity=".08"
            />
            {kind === 0 && (
              <>
                <path
                  d="M24 56h38"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M24 73h79M24 84h65"
                  stroke="#ebe8de"
                  strokeWidth="5"
                  strokeOpacity=".8"
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
                  fill="currentColor"
                />
                <rect
                  x="131"
                  y="49"
                  width="85"
                  height="78"
                  rx="5"
                  fill="currentColor"
                  fillOpacity=".08"
                />
                <circle
                  cx="174"
                  cy="88"
                  r="25"
                  stroke="currentColor"
                  strokeOpacity=".7"
                />
                <ellipse
                  cx="174"
                  cy="88"
                  rx="11"
                  ry="25"
                  stroke="currentColor"
                  strokeOpacity=".7"
                />
                <path
                  d="M149 88h50M153 75h42M153 101h42"
                  stroke="currentColor"
                  strokeOpacity=".7"
                />
              </>
            )}
            {kind === 1 && (
              <>
                <rect
                  x="22"
                  y="49"
                  width="47"
                  height="78"
                  rx="4"
                  fill="currentColor"
                  fillOpacity=".08"
                />
                <path
                  d="M31 61h28M31 73h20M31 85h24"
                  stroke="currentColor"
                  strokeOpacity=".5"
                  strokeLinecap="round"
                />
                <rect
                  x="82"
                  y="49"
                  width="135"
                  height="18"
                  rx="4"
                  fill="currentColor"
                  fillOpacity=".14"
                />
                {[80, 101, 122].map((y) => (
                  <g key={y}>
                    <circle cx="90" cy={y} r="4" stroke="currentColor" />
                    <path
                      d={`M103 ${y}h66`}
                      stroke="#ebe8de"
                      strokeOpacity=".35"
                    />
                    <path d={`m199 ${y} 3 3 6-6`} stroke="currentColor" />
                  </g>
                ))}
              </>
            )}
            {kind === 2 && (
              <>
                <rect
                  x="22"
                  y="49"
                  width="195"
                  height="32"
                  rx="4"
                  fill="currentColor"
                  fillOpacity=".12"
                />
                <path
                  d="M34 61h70M34 70h44"
                  stroke="#ebe8de"
                  strokeOpacity=".5"
                  strokeLinecap="round"
                />
                {[22, 90, 158].map((x) => (
                  <g key={x}>
                    <rect
                      x={x}
                      y="92"
                      width="59"
                      height="24"
                      rx="3"
                      stroke="currentColor"
                      strokeOpacity=".35"
                    />
                    <path
                      d={`M${x} 125h40`}
                      stroke="#ebe8de"
                      strokeOpacity=".3"
                    />
                  </g>
                ))}
              </>
            )}
            {kind === 3 && (
              <>
                {[23, 90, 157].map((x) => (
                  <g key={x}>
                    <rect
                      x={x}
                      y="49"
                      width="60"
                      height="56"
                      rx="4"
                      fill="currentColor"
                      fillOpacity=".1"
                    />
                    <path
                      d={`m${x + 19} 68 11-6 11 6v16l-11 6-11-6Z M${x + 19} 68l11 6 11-6 M${x + 30} 74v16`}
                      stroke="currentColor"
                      strokeOpacity=".65"
                    />
                    <path
                      d={`M${x} 115h30`}
                      stroke="#ebe8de"
                      strokeOpacity=".5"
                    />
                    <rect
                      x={x + 40}
                      y="112"
                      width="20"
                      height="9"
                      rx="3"
                      fill="currentColor"
                      fillOpacity=".5"
                    />
                  </g>
                ))}
              </>
            )}
          </>
        )}
      </svg>
    </Box>
  );
}
