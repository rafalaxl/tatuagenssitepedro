document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const phoneInput = document.getElementById('whatsapp-input');
  
  if (!phoneInput || !form) return;

  // Máscara dinâmica para o telefone brasileiro (XX) XXXXX-XXXX com limite de 11 dígitos
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    e.target.value = value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const nome = formData.get('nome')?.trim() || '';
    const whatsapp = formData.get('whatsapp')?.trim() || '';
    const estilo = formData.get('estilo') || '';
    const tamanho = formData.get('tamanho')?.trim() || '';
    const descricao = formData.get('descricao')?.trim() || '';
    const localizacao = formData.get('localizacao') || 'Não especificado';

    // RegExps para validação estrita
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,80}$/;
    const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
    
    // Higienização de strings para evitar XSS / injeção simples
    const sanitize = (text) => text.replace(/[<>'"&/]/g, '').trim();

    if (!nameRegex.test(nome)) {
      alert('Por favor, insira um nome válido (apenas letras, de 2 a 80 caracteres).');
      return;
    }

    if (!phoneRegex.test(whatsapp)) {
      alert('Por favor, insira um WhatsApp válido no formato (XX) XXXXX-XXXX.');
      return;
    }

    if (!estilo) {
      alert('Por favor, selecione um estilo de tatuagem.');
      return;
    }

    if (!tamanho || tamanho.length < 2) {
      alert('Por favor, insira o tamanho aproximado.');
      return;
    }

    if (!descricao || descricao.length < 5) {
      alert('Por favor, descreva um pouco mais a sua ideia.');
      return;
    }

    const cleanNome = sanitize(nome);
    const cleanTamanho = sanitize(tamanho);
    const cleanDescricao = sanitize(descricao);
    const cleanLocalizacao = sanitize(localizacao);

    const message = `Olá Pedro! Gostaria de um orçamento para um projeto autoral de tatuagem. Aqui estão os detalhes:
- Nome: ${cleanNome}
- Estilo: ${estilo}
- Local do Corpo: ${cleanLocalizacao}
- Tamanho Estimado: ${cleanTamanho}
- Descrição da Ideia: ${cleanDescricao}`;

    const waLink = `https://wa.me/5515996603395?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
  });
});
