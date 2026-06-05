document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-page-form form') || document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get('name') || '').toString().trim();
    const phone = (fd.get('phone') || '').toString().trim();
    const subject = (fd.get('subject') || '').toString().trim() || 'Contacto desde MetaScrapMX';
    const message = (fd.get('message') || '').toString().trim();

    const to = 'adnksharp@gmail.com';

    const bodyLines = [];
    if (name) bodyLines.push('Nombre: ' + name);
    if (phone) bodyLines.push('Teléfono: ' + phone);
    bodyLines.push('');
    bodyLines.push('Mensaje:');
    if (message) bodyLines.push(message);

    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${body}`;

    window.location.href = mailto;
  });
});
