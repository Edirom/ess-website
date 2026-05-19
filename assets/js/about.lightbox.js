function normalizeIndex(index, length) {
    return ((index % length) + length) % length;
}

function initAboutLightbox() {
    const triggers = Array.from(document.querySelectorAll('.gallery .about-lightbox-trigger'));
    const modalElement = document.getElementById('aboutGalleryModal');
    const imageElement = document.getElementById('aboutLightboxImage');
    const captionElement = document.getElementById('aboutLightboxCaption');
    const prevButton = document.getElementById('aboutLightboxPrev');
    const nextButton = document.getElementById('aboutLightboxNext');

    if (
        triggers.length === 0 ||
        !modalElement ||
        !imageElement ||
        !captionElement ||
        !prevButton ||
        !nextButton ||
        typeof bootstrap === 'undefined' ||
        !bootstrap.Modal
    ) {
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    let currentIndex = 0;

    function updateModalContent(index) {
        const normalizedIndex = normalizeIndex(index, triggers.length);
        const trigger = triggers[normalizedIndex];
        const src = trigger.getAttribute('href') || '';
        const caption = (trigger.firstElementChild.getAttribute('alt') || '').trim();

        currentIndex = normalizedIndex;
        imageElement.src = src;
        imageElement.alt = caption;
        captionElement.textContent = caption;
        captionElement.classList.toggle('d-none', caption.length === 0);
    }

    function openAt(index) {
        updateModalContent(index);
        modal.show();
    }

    function showPrev() {
        updateModalContent(currentIndex - 1);
    }

    function showNext() {
        updateModalContent(currentIndex + 1);
    }

    triggers.forEach((trigger, index) => {
        const declaredIndex = Number.parseInt(trigger.dataset.lightboxIndex || '', 10);
        const triggerIndex = Number.isInteger(declaredIndex) ? declaredIndex : index;

        trigger.setAttribute('role', 'button');
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('aria-label', 'Bild in Grossansicht oeffnen');

        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            openAt(triggerIndex);
        });

        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openAt(triggerIndex);
            }
        });
    });

    prevButton.addEventListener('click', showPrev);
    nextButton.addEventListener('click', showNext);

    modalElement.addEventListener('keydown', (event) => {
        if (!modalElement.classList.contains('show')) {
            return;
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            showPrev();
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            showNext();
        }
    });
}

window.addEventListener('DOMContentLoaded', initAboutLightbox);
