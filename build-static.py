"""Prepare the static stakeholder review; no application build dependencies."""
from pathlib import Path
import shutil
root=Path(__file__).resolve().parent
out=root/'dist'
if out.exists():shutil.rmtree(out)
out.mkdir()
for file in root.glob('*.html'):
 if file.name=='design-system.html':continue
 text=file.read_text().replace('<meta name="theme-color"','<meta name="robots" content="noindex,nofollow"><meta name="theme-color"',1)
 (out/file.name).write_text(text)
shutil.copytree(root/'assets',out/'assets')
(out/'robots.txt').write_text('User-agent: *\nDisallow: /\n')
print('Prepared',len(list(out.glob('*.html'))),'review pages in dist/')
