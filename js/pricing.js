// Pricing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const billingToggle = document.getElementById('billingToggle');
    const monthlyLabel = document.querySelector('[data-period="monthly"]');
    const annualLabel = document.querySelector('[data-period="annual"]');
    const priceAmounts = document.querySelectorAll('.price-amount .amount');
    const priceNotes = document.querySelectorAll('.price-note');

    // Set initial state
    updatePrices(false);
    updateLabels(false);

    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            updatePrices(isAnnual);
            updateLabels(isAnnual);
        });
    }

    function updatePrices(isAnnual) {
        priceAmounts.forEach(amount => {
            const monthly = amount.dataset.monthly;
            const annual = amount.dataset.annual;

            if (monthly && annual) {
                amount.textContent = isAnnual ? annual : monthly;
            }
        });

        priceNotes.forEach(note => {
            if (note.textContent.includes('Billed')) {
                note.textContent = note.textContent.replace(
                    isAnnual ? 'Billed monthly' : 'Billed annually',
                    isAnnual ? 'Billed annually' : 'Billed monthly'
                );
            }
        });
    }

    function updateLabels(isAnnual) {
        if (monthlyLabel && annualLabel) {
            monthlyLabel.classList.toggle('active', !isAnnual);
            annualLabel.classList.toggle('active', isAnnual);
        }
    }

    // FAQ Accordion (optional enhancement)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                item.classList.toggle('expanded');
            });
        }
    });
});
