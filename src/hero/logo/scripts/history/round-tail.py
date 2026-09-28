from pathlib import Path
import re,json
p=Path('outputs/wyre-demo.html');s=Path('work/wyre-before-round-tail.html').read_text()
m=re.search(r'const routes=(.*?);',s);routes=json.loads(m[1])
routes[1]='M57 310 L202.73 686.73 Q204 690 204.51 696.98 L213 812 C221 912 185 956 120 956 L20 956'
routes[2]='M104 310 L256.70 686.77 Q258 690 257.98 693.50 L257.36 815 C257 934 213 984 141 984 L20 984'
routes[5]='M449 310 L312.19 686.71 Q311 690 310.68 693.49 L299.36 815 C286 961 245 1012 162 1012 L20 1012'
routes[6]='M495 310 L366.13 686.69 Q365 690 364.37 693.44 L342.22 815 C310 990 235 1040 175 1040 L20 1040'
s=s[:m.start(1)]+json.dumps(routes)+s[m.end(1):];p.write_text(s)
