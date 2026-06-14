try {
  const res = await fetch('https://fakestoreapi.com/products');
  console.log('status', res.status, 'ok', res.ok);
  const text = await res.text();
  console.log('body length', text.length);
} catch (e) {
  console.error('error', e);
  process.exit(1);
}
