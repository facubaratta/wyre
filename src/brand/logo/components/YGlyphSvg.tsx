import type { SVGProps } from 'react';
import { VIEWBOX_WIDTH } from '../geometry';

export function YGlyphSvg({ style, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VIEWBOX_WIDTH} 1000`}
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...props}
      style={{
        width: `${VIEWBOX_WIDTH / 1000}em`,
        height: '1em',
        verticalAlign: '-0.1535em',
        overflow: 'visible',
        ...style,
      }}
    />
  );
}
