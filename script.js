document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    const goToSlide = (index) => {
        const offset = -index * (100 / totalSlides); 
        slider.style.transform = `translateX(${offset}%)`;
        currentSlide = index;
    };
    const nextSlide = () => {
        const nextIndex = (currentSlide + 1) % totalSlides;
        goToSlide(nextIndex);
    };
    const prevSlide = () => {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(prevIndex);
    };
    const ratingContainers = document.querySelectorAll('.user-rating');
    const userRatings = {}; 

    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const ratingText = container.querySelector('.rating-text');
        const slideIndex = container.dataset.slide;
        const updateStars = (rating, className) => {
            stars.forEach(star => {
                const starValue = parseInt(star.dataset.value);
                if (starValue <= rating) {
                    star.classList.add(className);
                } else {
                    star.classList.remove(className);
                }
            });
        };
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('star')) {
                const rating = parseInt(e.target.dataset.value);
                stars.forEach(star => {
                    star.classList.remove('selected', 'hovered');
                });
                updateStars(rating, 'selected');
                
                userRatings[slideIndex] = rating;
                ratingText.textContent = `You Rated: ${rating} / 5`;
            }
        });
        container.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('star')) {
                const hoverRating = parseInt(e.target.dataset.value);
                stars.forEach(star => star.classList.remove('hovered'));
                updateStars(hoverRating, 'hovered');
            }
        });
        container.addEventListener('mouseout', () => {
            stars.forEach(star => {
                star.classList.remove('hovered');
            });
        });
    });
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
});