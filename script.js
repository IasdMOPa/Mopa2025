document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------
    // 1. Dados dos Álbuns (Você precisa ajustar 'count' para o número real de fotos em cada álbum)
    // As fotos devem estar em './images/[album_id]_[numero].jpg'
    // Ex: para 'comunidade_sentir_plus', as fotos seriam:
    // './images/comunidade_sentir_plus_1.jpg'
    // './images/comunidade_sentir_plus_2.jpg'
    // ... até o 'count' especificado
    // --------------------------------------------------------------------
    const albumsConfig = {
        comunidade_sentir_plus: {
            title: 'Comunidade Sentir plus',
            count: 4 // Exemplo: se você tem comunidade_sentir_plus_1.jpg a comunidade_sentir_plus_5.jpg
        },
        igreja_celebracao_30_anos_mm: {
            title: 'Igreja Celebração 30 anos mm',
            count: 2 // Exemplo: se você tem 7 fotos
        },
        igreja_central_medicilandia: {
            title: 'Igreja Central Medicilandia',
            count: 3 // Exemplo: se você tem 4 fotos
        }
    };

    // --------------------------------------------------------------------
    // 2. Menu Hamburguer (Mobile)
    // --------------------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Muda para X ao abrir
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fechar menu ao clicar em um link (apenas no mobile)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) { // Considerar "mobile" abaixo de 768px
                    mainNav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // --------------------------------------------------------------------
    // 3. Rolagem Suave para Âncoras
    // --------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --------------------------------------------------------------------
    // 4. Funcionalidade do Lightbox (Galeria de Fotos)
    // --------------------------------------------------------------------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentAlbumPhotos = []; // Array de { src, caption }
    let currentPhotoIndex = 0;

    // Abrir Lightbox
    document.querySelectorAll('.btn-view-album').forEach(button => {
        button.addEventListener('click', () => {
            const albumId = button.closest('.album-card').dataset.albumId;
            const albumInfo = albumsConfig[albumId];

            if (albumInfo) {
                currentAlbumPhotos = [];
                for (let i = 1; i <= albumInfo.count; i++) {
                    currentAlbumPhotos.push({
                        src: `./images/${albumId}_${i}.jpg`,
                        caption: `${albumInfo.title} - Foto ${i}`
                    });
                }

                if (currentAlbumPhotos.length > 0) {
                    currentPhotoIndex = 0;
                    showPhoto(currentPhotoIndex);
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    // Mostrar uma foto específica no Lightbox
    function showPhoto(index) {
        if (currentAlbumPhotos && currentAlbumPhotos.length > 0) {
            const photo = currentAlbumPhotos[index];
            lightboxImg.src = photo.src;
            lightboxImg.alt = photo.caption;
            lightboxCaption.textContent = photo.caption;

            prevBtn.style.display = (index === 0) ? 'none' : 'block';
            nextBtn.style.display = (index === currentAlbumPhotos.length - 1) ? 'none' : 'block';
        }
    }

    // Navegar para a próxima foto
    nextBtn.addEventListener('click', () => {
        if (currentPhotoIndex < currentAlbumPhotos.length - 1) {
            currentPhotoIndex++;
            showPhoto(currentPhotoIndex);
        }
    });

    // Navegar para a foto anterior
    prevBtn.addEventListener('click', () => {
        if (currentPhotoIndex > 0) {
            currentPhotoIndex--;
            showPhoto(currentPhotoIndex);
        }
    });

    // Fechar Lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Fechar Lightbox ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Fechar Lightbox com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
