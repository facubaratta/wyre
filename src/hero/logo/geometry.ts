export const VIEWBOX_WIDTH = 556.152;
export const CYCLE_SECONDS = 8;
export const CYAN = '#74e0f2';
export const SUBSTRATE = '#174b9c';

export interface RouteDefinition {
  d: string;
  sideExit: boolean;
  speed: number;
  launches: readonly number[];
}

export const ROUTES: readonly RouteDefinition[] = [
  {
    "d": "M20 310 L162.50 683.46 Q165 690 167.21 696.64 L177.79 728.36 Q180 735 175.05 739.95 L151 764",
    "sideExit": true,
    "speed": 164,
    "launches": [
      0.75,
      4.8
    ]
  },
  {
    "d": "M57 310 L202.73 686.73 Q204 690 204.51 696.98 L213 812 C221 912 185 956 120 956 L20 956",
    "sideExit": false,
    "speed": 167,
    "launches": [
      0
    ]
  },
  {
    "d": "M104 310 L256.70 686.77 Q258 690 257.98 693.50 L257.36 815 C257 934 213 984 141 984 L20 984",
    "sideExit": false,
    "speed": 170,
    "launches": [
      1.6
    ]
  },
  {
    "d": "M151 310 L227.71 531.39 Q230 538 234.95 542.95 L266 574",
    "sideExit": true,
    "speed": 173,
    "launches": [
      2.4,
      6.25
    ]
  },
  {
    "d": "M403 310 L332.13 531.33 Q330 538 325.05 542.95 L294 574",
    "sideExit": true,
    "speed": 176,
    "launches": [
      3.15
    ]
  },
  {
    "d": "M449 310 L312.19 686.71 Q311 690 310.68 693.49 L299.36 815 C286 961 245 1012 162 1012 L20 1012",
    "sideExit": false,
    "speed": 179,
    "launches": [
      4.65
    ]
  },
  {
    "d": "M495 310 L366.13 686.69 Q365 690 364.37 693.44 L342.22 815 C310 990 235 1040 175 1040 L20 1040",
    "sideExit": false,
    "speed": 182,
    "launches": [
      1.8,
      5.8
    ]
  },
  {
    "d": "M531 310 L400.31 683.39 Q398 690 396.06 696.72 L386.94 728.28 Q385 735 389.95 739.95 L414 764",
    "sideExit": true,
    "speed": 185,
    "launches": [
      1.35,
      5.35
    ]
  }
];

export interface BranchDefinition {
  d: string;
  end: readonly [number, number];
  route: number;
  major: boolean;
}
export const BRANCHES: readonly BranchDefinition[] = [
  {
    "d": "M131 500 H149 L159 510 V541",
    "end": [
      159,
      541
    ],
    "route": 1,
    "major": true
  },
  {
    "d": "M217 590 H203 L192 601 V627",
    "end": [
      192,
      627
    ],
    "route": 2,
    "major": true
  },
  {
    "d": "M378 505 H397 L406 514 V538",
    "end": [
      406,
      538
    ],
    "route": 5,
    "major": true
  },
  {
    "d": "M379 650 H365 L352 663 V690",
    "end": [
      352,
      690
    ],
    "route": 6,
    "major": true
  },
  {
    "d": "M212 805 H229 L238 814 V842",
    "end": [
      238,
      842
    ],
    "route": 1,
    "major": true
  },
  {
    "d": "M330 870 H314 L305 879 V905",
    "end": [
      305,
      905
    ],
    "route": 6,
    "major": true
  },
  {
    "d": "M153 430 H166 L176 440 V462",
    "end": [
      176,
      462
    ],
    "route": 2,
    "major": false
  },
  {
    "d": "M413 410 H399 L389 420 V442",
    "end": [
      389,
      442
    ],
    "route": 5,
    "major": false
  }
];

export const SERVICE_STRIPS = [
  { x: 105, y: 420, angle: -21, route: 1, height: 54 },
  { x: 450, y: 420, angle: 21, route: 6, height: 54 },
] as const;
export const SIDE_PORTS = [
  { route: 0, x: 174, y: 742, angle: -21 },
  { route: 3, x: 247, y: 555, angle: -18.5 },
  { route: 4, x: 313, y: 555, angle: 18.5 },
  { route: 7, x: 390, y: 740, angle: 21 },
] as const;
export const CONTACT_FIELDS = [
  [131, 568, -21], [416, 589, 21], [230, 744, 0],
  [282, 789, 0], [85, 970, 0], [128, 1026, 0],
] as const;
export const TEST_POINTS = [
  { route: 2, fraction: 0.7 }, { route: 5, fraction: 0.78 },
] as const;
