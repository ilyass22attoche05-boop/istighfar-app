const sharp = require('sharp');
(async () => {
  const src = 'icon512.png';
  await sharp(src).resize(1024, 1024).png().toFile('assets/icon-only.png');
  await sharp({ create: { width: 1024, height: 1024, channels: 4, background: '#1f8a7a' } }).png().toFile('assets/icon-background.png');
  const fg = await sharp(src).resize(680, 680).png().toBuffer();
  await sharp({ create: { width: 1024, height: 1024, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: fg, gravity: 'center' }]).png().toFile('assets/icon-foreground.png');
  const sp = await sharp(src).resize(600, 600).png().toBuffer();
  await sharp({ create: { width: 2732, height: 2732, channels: 4, background: '#0d0805' } })
    .composite([{ input: sp, gravity: 'center' }]).png().toFile('assets/splash.png');
  console.log('icons ready');
})().catch(e => { console.error(e); process.exit(1); });
