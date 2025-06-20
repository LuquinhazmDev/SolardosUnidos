const toggleBtn = document.querySelector('.header__toggle');
const nav = document.querySelector('.header__nav');

toggleBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // impede que o clique no botão dispare o listener global
  nav.classList.toggle('active');
});

// Fecha o menu ao clicar fora
document.addEventListener('click', (e) => {
  const isClickInsideNav = nav.contains(e.target);
  const isClickOnButton = toggleBtn.contains(e.target);

  if (!isClickInsideNav && !isClickOnButton) {
    nav.classList.remove('active');
  }
});

// Nossa Caminhada


const track = document.querySelector('.carousel-track');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const items = document.querySelectorAll('.carousel-item');

let currentPosition = 0;

// Função para detectar quantos itens cabem na tela baseado no viewport e item width atual
function itensVisiveis() {
  const viewportWidth = document.querySelector('.carousel-viewport').offsetWidth;
  const itemStyle = getComputedStyle(items[0]);
  const itemWidth = items[0].offsetWidth + parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);
  return Math.floor(viewportWidth / itemWidth);
}

function maxPosition() {
  return items.length - itensVisiveis();
}

leftBtn.addEventListener('click', () => {
  if (currentPosition > 0) {
    currentPosition--;
    atualizarCarrossel();
  }
});

rightBtn.addEventListener('click', () => {
  if (currentPosition < maxPosition()) {
    currentPosition++;
    atualizarCarrossel();
  }
});

function atualizarCarrossel() {
  const itemStyle = getComputedStyle(items[0]);
  const itemWidth = items[0].offsetWidth + parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);
  const deslocamento = currentPosition * itemWidth;
  track.style.transform = `translateX(-${deslocamento}px)`;
}

// Atualiza o carrossel ao redimensionar para evitar bugs
window.addEventListener('resize', () => {
  if (currentPosition > maxPosition()) {
    currentPosition = maxPosition() < 0 ? 0 : maxPosition();
    atualizarCarrossel();
  }
});


// Depoimentos

const testimonials = document.querySelectorAll('.testimonials__carousel .testimonials__item');
const btnPrev = document.querySelector('.testimonials__btn--prev');
const btnNext = document.querySelector('.testimonials__btn--next');

let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}

function changeTestimonial(direction) {
  currentIndex += direction;
  if (currentIndex >= testimonials.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = testimonials.length - 1;
  showTestimonial(currentIndex);
}

btnPrev.addEventListener('click', () => changeTestimonial(-1));
btnNext.addEventListener('click', () => changeTestimonial(1));

// Inicializa com o primeiro depoimento
showTestimonial(currentIndex);


// Trasparencia

document.querySelector('.accordion-transparency').addEventListener('click', function (e) {
  const button = e.target.closest('.accordion-title');
  if (!button) return;

  const item = button.parentElement;
  const isActive = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.accordion-item').forEach(el => {
    el.classList.remove('active');
    el.querySelector('.icon').textContent = '＋';
  });

  // Open clicked
  if (!isActive) {
    item.classList.add('active');
    button.querySelector('.icon').textContent = '✕';
  }
});

// Doação

function copiarTexto(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    alert('Chave Pix copiada!');
  }).catch(() => {
    alert('Erro ao copiar chave Pix.');
  });
}

// Projetos
const modal = document.getElementById('modal');
const modalText = document.querySelector('.modal__text');
const modalGallery = document.getElementById('modalCarouselTrack');
const closeModal = document.querySelector('.modal__close');
const prevBtn = document.getElementById('modalCarouselPrev');
const nextBtn = document.getElementById('modalCarouselNext');

let startX = 0;
let isDragging = false;

let currentIndexModal = 0;

document.querySelectorAll('.projects__button').forEach((button, index) => {
  button.addEventListener('click', () => {
    const texts = [
      'Este projeto apoia jovens com oficinas de arte e cultura.',
      'Projeto Realizado em 2025 em combate ao abuso e exploração sexual de crianças e adolescentes',
      'Atividades esportivas para fortalecer vínculos sociais.'
    ];

    const images = [
      ['assets/Projetos Realizados/CEI SOLAR II/1.jpeg', 'assets/Projetos Realizados/CEI SOLAR II/2.jpeg', 'assets/Projetos Realizados/CEI SOLAR II/3.jpeg', 'assets/Projetos Realizados/CEI SOLAR II/4.jpeg', "assets/Projetos Realizados/CEI SOLAR II/5.jpeg", 'assets/Projetos Realizados/CEI SOLAR II/6.jpeg', 'assets/Projetos Realizados/CEI SOLAR II/7.jpeg'],
      ['assets/Projetos Realizados/Caminhada Maio Laranja/CML 1.jpg', 'assets/Projetos Realizados/Caminhada Maio Laranja/CML 2.jpg', 'assets/Projetos Realizados/Caminhada Maio Laranja/CML 3.jpg', 'assets/Projetos Realizados/Caminhada Maio Laranja/CML 4.jpg', 'assets/Projetos Realizados/Caminhada Maio Laranja/CML 5.jpg', 'assets/Projetos Realizados/Caminhada Maio Laranja/CML 6.jpg'],
      ['assets/esporte1.jpg', 'assets/esporte2.jpg', 'assets/esporte3.jpg']
    ];

    modalText.textContent = texts[index] || 'Informações sobre o projeto.';
    modalGallery.innerHTML = '';

    (images[index] || []).forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Foto do projeto';
      modalGallery.appendChild(img);
    });

    currentIndexModal = 0;
    updateModalCarousel();
    modal.style.display = 'flex';
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

function updateModalCarousel() {
  const item = modalGallery.children[0];
  if (!item) return;

  const itemWidth = item.offsetWidth + 10; // inclui o gap
  const totalWidth = modalGallery.children.length * itemWidth;
  const maxScroll = totalWidth - modalGallery.parentElement.offsetWidth;

  let offset = currentIndex * itemWidth;
  if (offset > maxScroll) {
    currentIndex = modalGallery.children.length - Math.floor(modalGallery.parentElement.offsetWidth / itemWidth);
    offset = currentIndex * itemWidth;
  }
  if (currentIndex < 0) currentIndex = 0;

  modalGallery.style.transform = `translateX(-${offset}px)`;
}

modalGallery.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

modalGallery.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const moveX = e.touches[0].clientX;
  const diffX = startX - moveX;

  if (Math.abs(diffX) > 50) { // distância mínima para considerar swipe
    if (diffX > 0 && currentIndex < modalGallery.children.length - 1) {
      currentIndex++;
    } else if (diffX < 0 && currentIndex > 0) {
      currentIndex--;
    }
    updateModalCarousel();
    isDragging = false; // evita múltiplos swipes no mesmo toque
  }
});

modalGallery.addEventListener('touchend', () => {
  isDragging = false;
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < modalGallery.children.length - 1) {
    currentIndex++;
    updateModalCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateModalCarousel();
  }
});


// Modal Unidade


const unidadeData = {
  1: {
    title: "Endereço – Rua das Perobeiras, 360, Chácara Sta Maria, São Paulo / SP",
    desc: "A comunidade do CEI SOLAR DOS UNIDOS I é composta por moradores da região de Valo velho, Zona Sul de São Paulo, " +
      "formado pelos distritos de Capão Redondo, Campo Limpo e Valo Velho. A gestão democrática nos permite criar " +
      "estratégias envolvendo toda a comunidade, com isso é possível observar e identificar as características e culturas " +
      "familiares, traçando o perfil da comunidade SOLAR DOS UNIDOS I.\n" +
      "Teremos como instrumento de apoio a pesquisa sociocultural familiar que irá contribuir com as ações e intencionalidades " +
      "de acordo com as necessidades apresentadas. O objetivo é oferecer uma educação de qualidade respeitando as infâncias, " +
      "oportunizando experiências significativas para todas as crianças.\n" +
      "Os espaços do CEI contam com áreas externas com luz natural, favorecendo a percepção do dia. Conta com pisos térmicos e " +
      "emborrachados adequados para que todos brinquem de forma segura. Parques equipados com brinquedos, escorregadores, " +
      "piscina de bolinha, cama elástica, motocas, entre outros.\n" +
      "Temos uma comunidade participativa que colabora e contribui com as propostas pedagógicas oferecidas."
  },
  2: {
    title: "Avenida Sabin, 176, Cidade Auxiliadora, São Paulo/SP",
    desc: "Nós somos o CEI SOLAR DOS UNIDOS II, estamos a 7 anos à frente desse trabalho desde 2018, no estado de São Paulo - Capão Redondo, onde trabalhamos com faixa etária de 00 a 04 anos de idade, na nossa unidade a criança é vista como alteridade e empatia, procuramos compreender e enxergar o mundo por meio dos olhares das infâncias para melhor acolher e perceber seus conceitos e desejos de forma respeitosa, é um ser autônomo e protagonista de suas ações. A compreensão do crescimento da criança e do aprendizado leva em conta a relevância das influências biológicas e sociais, porém reconhece que esses fatores estão interligados: ambos impactam e ajudam no desenvolvimento do indivíduo em formação."
  },
  3: {
    title: "Rua Laudelino Gomes Ribeiro, 255, Jd Iracema, Taboão da Serra, SP",
    desc: "A matriz da ONG Solar dos Unidos, localizada em Taboão da Serra (SP), atende crianças e adolescentes de 6 a 15 anos no contraturno escolar. O foco é acolher jovens em situação de vulnerabilidade social, oferecendo atividades educativas, culturais e de cidadania. Com o apoio de voluntários e parcerias, a unidade promove um ambiente seguro e acolhedor, contribuindo para o desenvolvimento integral e a melhoria da qualidade de vida das famílias atendidas."
  }
};

document.querySelectorAll('.unidade__botao').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('data-unidade');
    const modal = document.getElementById('unidadeModal');
    document.getElementById('modal-unidade-title').textContent = unidadeData[id].title;
    document.getElementById('modal-unidade-desc').textContent = unidadeData[id].desc;
    modal.style.display = 'block';
  });
});

document.querySelector('.unidade-modal__close').addEventListener('click', () => {
  document.getElementById('unidadeModal').style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target.id === 'unidadeModal') {
    document.getElementById('unidadeModal').style.display = 'none';
  }
});
