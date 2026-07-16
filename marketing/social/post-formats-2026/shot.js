const { chromium } = require('playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const frames = ['01-brand','02-program','03-event','04-wcp','05-openhouse','06-lab','07-photo','08-story-openhouse'];
  for (const f of frames) {
    const h = f.startsWith('08') ? 1920 : 1350;
    const page = await browser.newPage({ viewport: { width: 1080, height: h }, deviceScaleFactor: 1 });
    await page.goto('file://' + path.join(__dirname, f + '.html'));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(__dirname, 'out', f + '.png') });
    await page.close();
    console.log(f, 'done');
  }
  await browser.close();
})();
