function getCourseInputs() {
    return Array.from(document.querySelectorAll('input[name="kurse[]"]'));
}

function getInteractiveCourseInputs() {
    return getCourseInputs().filter((input) => input.dataset.slots);
}

function getCourseLabelText(item) {
    const label = item.querySelector('.form-check-label');
    return label ? label.innerText.trim() : '';
}

function sortList() {
    const list = document.querySelector('.kurse');

    if (!list) {
        return;
    }

    const items = Array.from(list.querySelectorAll('.form-check'));

    items
        .sort((left, right) => getCourseLabelText(left).localeCompare(getCourseLabelText(right), 'de'))
        .forEach((item) => list.appendChild(item));
}

function syncCoursePlacement() {
    const list = document.querySelector('.kurse');
    const basket = document.getElementById('basket');

    if (!list || !basket) {
        return;
    }

    getInteractiveCourseInputs().forEach((input) => {
        const item = input.closest('.form-check');

        if (!item) {
            return;
        }

        if (input.checked) {
            basket.appendChild(item);
        } else {
            list.appendChild(item);
        }
    });

    sortList();
}

function updateDisabledStates() {
    const checkedSlots = new Set(
        getInteractiveCourseInputs()
            .filter((input) => input.checked)
            .flatMap((input) => input.dataset.slots.split(' ').filter(Boolean))
    );

    getCourseInputs().forEach((input) => {
        if (!input.dataset.slots) {
            return;
        }

        if (input.checked) {
            input.disabled = false;
            return;
        }

        const hasConflict = input.dataset.slots
            .split(' ')
            .filter(Boolean)
            .some((slot) => checkedSlots.has(slot));

        input.disabled = hasConflict;
    });
}

function getTotal() {
    const studentCheckbox = document.getElementById('studi');
    const feeInput = document.getElementById('gebuehr');
    const feeSpan = document.getElementById('gebuehrSpan');

    if (!feeInput || !feeSpan) {
        return;
    }

    let total = 0;

    if (!studentCheckbox || !studentCheckbox.checked) {
        total = Array.from(document.querySelectorAll('#basket .form-check-input:checked')).reduce((sum, input) => {
            const costs = Number.parseInt(input.dataset.costs || '0', 10);
            return sum + (Number.isNaN(costs) ? 0 : costs);
        }, 0);
    }

    feeInput.value = String(total);
    feeSpan.textContent = String(total);
}

function updateRecaptchaFeedback() {
    const recaptcha = document.querySelector('.g-recaptcha');

    if (!recaptcha) {
        return false;
    }

    const response = document.getElementById('g-recaptcha-response');
    const isValid = !!response && response.value.trim().length > 0;
    let feedback = recaptcha.querySelector('.invalid-feedback[data-generated="recaptcha"]');

    if (isValid) {
        recaptcha.style.removeProperty('border');
        if (feedback) {
            feedback.remove();
        }
        return true;
    }

    if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback d-block';
        feedback.dataset.generated = 'recaptcha';
        feedback.textContent = 'Bitte das Captcha ausfüllen';
        recaptcha.appendChild(feedback);
    }

    recaptcha.style.border = '1px solid red';
    return false;
}

function initCourseForm() {
    const studentCheckbox = document.getElementById('studi');

    syncCoursePlacement();
    updateDisabledStates();
    getTotal();

    document.addEventListener('change', (event) => {
        const target = event.target;

        if (!(target instanceof HTMLInputElement)) {
            return;
        }

        if (target.name === 'kurse[]') {
            syncCoursePlacement();
            updateDisabledStates();
            getTotal();
            return;
        }

        if (studentCheckbox && target === studentCheckbox) {
            getTotal();
        }
    });
}

function initValidation() {
    const forms = Array.from(document.getElementsByClassName('needs-validation'));

    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            const recaptchaIsValid = updateRecaptchaFeedback();

            if (!form.checkValidity() || !recaptchaIsValid) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initCourseForm();
    initValidation();
});
