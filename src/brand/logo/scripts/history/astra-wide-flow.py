from pathlib import Path
import re,json
p=Path('outputs/wyre-demo.html');s=Path('work/wyre-demo-before-astra.html').read_text()
# Shared bend treatment: deliberate long, straight PCB runs with compact corner radii.
def route(points,r=7):
 import math
 out=[f'M{points[0][0]} {points[0][1]}']
 for a,b,c in zip(points,points[1:],points[2:]):
  la=math.dist(a,b);lb=math.dist(b,c);d=min(r,la/3,lb/3)
  q=(b[0]+(a[0]-b[0])*d/la,b[1]+(a[1]-b[1])*d/la)
  t=(b[0]+(c[0]-b[0])*d/lb,b[1]+(c[1]-b[1])*d/lb)
  out.append(f'L{q[0]:.2f} {q[1]:.2f} Q{b[0]} {b[1]} {t[0]:.2f} {t[1]:.2f}')
 out.append(f'L{points[-1][0]} {points[-1][1]}');return ' '.join(out)
pts=[[(20,310),(165,690),(180,735),(151,764)],[(57,310),(204,690),(218,880),(142,956),(20,956)],[(104,310),(258,690),(257,885),(158,984),(20,984)],[(151,310),(230,538),(266,574)],[(403,310),(330,538),(294,574)],[(449,310),(311,690),(292,894),(174,1012),(20,1012)],[(495,310),(365,690),(326,904),(190,1040),(20,1040)],[(531,310),(398,690),(385,735),(414,764)]]
s=re.sub(r'const routes=.*?;\nconst branches=.*?;', 'const routes='+json.dumps([route(x) for x in pts])+';\nconst branches=[];',s)
s=s.replace('new Set([0,3,6,7])','new Set([0,3,4,7])')
s=s.replace('[[84,417,-18.5,1,64],[435,431,18.5,5,78]]','[[105,420,-21,1,54],[450,420,21,6,54]]')
s=s.replace('[[0,100,558,-21],[3,254,592,-18.5],[6,447,610,20],[7,476,531,20]]','[[0,174,742,-21],[3,247,555,-18.5],[4,313,555,18.5],[7,390,740,21]]')
s=s.replace('fill="#24577f"','fill="#174b9c"').replace("fill:'#24577f'","fill:'#174b9c'")
p.write_text(s)
