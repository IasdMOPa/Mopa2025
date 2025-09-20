document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------
    // 1. Dados dos Álbuns (ATENÇÃO: Ajuste 'count' para o número REAL de fotos em CADA álbum)
    // As fotos devem estar em './[album_id]/[album_id]_[numero].jpg'
    // Ex: para 'comunidade_sentir', as fotos seriam:
    // './comunidade_sentir/comunidade_sentir_1.jpg'
    // './comunidade_sentir/comunidade_sentir_2.jpg'
    // ... até o 'count' especificado
    // --------------------------------------------------------------------
    const albumsConfig = {
        comunidade_sentir: { // Corresponde ao nome da pasta e data-album-id
            title: 'Comunidade Sentir',
            count: 3 // Verifique quantas fotos você tem: comunidade_sentir_1.jpg, _2.jpg, _3.jpg
        },
        igreja_celebracao: { // Corresponde ao nome da pasta e data-album-id
            title: 'Igreja Celebração',
            count: 2 // Verifique quantas fotos você tem
        },
        igreja_medicilandia: { // Corresponde ao nome da pasta e data-album-id
            title: 'Igreja Central Medicilândia',
            count: 2 // Verifique quantas fotos você tem
        },
        academia_iatai: { // Corresponde ao nome da pasta e data-album-id
            title: 'Academia IATAI',
            count: 3 // Verifique quantas fotos você tem
        },
        conservatorio_iatai: { // Corresponde ao nome da pasta e data-album-id
            title: 'Conservatório Musical IATAI',
            count: 3 // Verifique quantas fotos você tem
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
                    // CAMINHO DA IMAGEM AJUSTADO AQUI!
                    currentAlbumPhotos.push({
                        src: `./${albumId}/${albumId}_${i}.jpg`,
                        caption: `${albumInfo.title} - Foto ${i}`
                    });
                }

                if (currentAlbumPhotos.length > 0) {
                    currentPhotoIndex = 0;
                    showPhoto(currentPhotoIndex);
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            } else {
                console.error(`Configuração do álbum "${albumId}" não encontrada.`);
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
