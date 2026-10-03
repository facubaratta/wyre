#!/usr/bin/env python3
"""Reproduce the current primary routes from the design's authored control points.

The compact corners use the original Astra wide-flow construction. Four rounded
lower tails use the final cubic replacements from the round-tail design pass.
Standard library only; React does not execute Python at runtime.
"""
import argparse
import json
import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
# Glyph space: Arial bold at 1000 units, baseline y=846.5.
CONTROL_POINTS = [
    [(20, 310), (165, 690), (180, 735), (151, 764)],
    [(57, 310), (204, 690), (218, 880), (142, 956), (20, 956)],
    [(104, 310), (258, 690), (257, 885), (158, 984), (20, 984)],
    [(151, 310), (230, 538), (266, 574)],
    [(403, 310), (330, 538), (294, 574)],
    [(449, 310), (311, 690), (292, 894), (174, 1012), (20, 1012)],
    [(495, 310), (365, 690), (326, 904), (190, 1040), (20, 1040)],
    [(531, 310), (398, 690), (385, 735), (414, 764)],
]
# Explicit cubic controls preserve both the shape and spacing of the rounded tail.
ROUNDED_TAILS = {
    1: 'M57 310 L202.73 686.73 Q204 690 204.51 696.98 L213 812 C221 912 185 956 120 956 L20 956',
    2: 'M104 310 L256.70 686.77 Q258 690 257.98 693.50 L257.36 815 C257 934 213 984 141 984 L20 984',
    5: 'M449 310 L312.19 686.71 Q311 690 310.68 693.49 L299.36 815 C286 961 245 1012 162 1012 L20 1012',
    6: 'M495 310 L366.13 686.69 Q365 690 364.37 693.44 L342.22 815 C310 990 235 1040 175 1040 L20 1040',
}
SIDE_EXITS = {0, 3, 4, 7}
LAUNCHES = [[.75, 4.8], [0], [1.6], [2.4, 6.25], [3.15], [4.65], [1.8, 5.8], [1.35, 5.35]]


def compact_corners(points, radius=7):
    out = [f'M{points[0][0]} {points[0][1]}']
    for previous, corner, following in zip(points, points[1:], points[2:]):
        before_length, after_length = math.dist(previous, corner), math.dist(corner, following)
        distance = min(radius, before_length / 3, after_length / 3)
        before = tuple(corner[k] + (previous[k] - corner[k]) * distance / before_length for k in (0, 1))
        after = tuple(corner[k] + (following[k] - corner[k]) * distance / after_length for k in (0, 1))
        out.append(f'L{before[0]:.2f} {before[1]:.2f} Q{corner[0]} {corner[1]} {after[0]:.2f} {after[1]:.2f}')
    out.append(f'L{points[-1][0]} {points[-1][1]}')
    return ' '.join(out)


def routes():
    return [dict(d=ROUNDED_TAILS.get(index, compact_corners(points)), sideExit=index in SIDE_EXITS,
                 speed=164 + index * 3, launches=LAUNCHES[index])
            for index, points in enumerate(CONTROL_POINTS)]



def parse_routes(source):
    """Read the generated data after TypeScript formatting by Prettier."""
    source = re.sub(r'([\{,]\s*)([A-Za-z_]\w*)(\s*:)', r'\1"\2"\3', source)
    source = re.sub(r"'([^']*)'", lambda match: json.dumps(match.group(1)), source)
    source = re.sub(r',(\s*[}\]])', r'\1', source)
    return json.loads(source)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    action = parser.add_mutually_exclusive_group()
    action.add_argument('--check', action='store_true', help='Check geometry.ts against these controls (default).')
    action.add_argument('--write', action='store_true', help='Update only the primary ROUTES array in geometry.ts.')
    parser.add_argument('--json', type=Path, help='Also export generated route data as JSON.')
    args = parser.parse_args()
    generated = routes()
    geometry = ROOT / 'geometry.ts'
    source = geometry.read_text()
    pattern = r'(export const ROUTES: readonly RouteDefinition\[\] = )(\[.*?\])(;)'
    match = re.search(pattern, source, re.S)
    if not match:
        raise SystemExit('ROUTES array not found in geometry.ts')
    if args.write:
        source = source[:match.start(2)] + json.dumps(generated, indent=2) + source[match.end(2):]
        geometry.write_text(source)
        print(f'Updated {geometry.name}: 8 routes, 4 side exits, 4 lower-tail routes.')
    elif parse_routes(match.group(2)) != generated:
        raise SystemExit('geometry.ts differs from authored controls; use --write to regenerate.')
    else:
        print('Geometry matches: 4 left origins, 4 right origins, 4 side exits, 4 lower-tail routes.')
    if args.json:
        args.json.write_text(json.dumps(generated, indent=2) + '\n')


if __name__ == '__main__':
    main()
