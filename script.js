// AOS初期化
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
});

// カウントアップアニメーション
function countUp(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function timer() {
        start += increment;
        if (start >= target) {
            element.textContent = target;
        } else {
            if (target >= 1000) {
                element.textContent = Math.floor(start).toLocaleString();
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
            requestAnimationFrame(timer);
        }
    }
    timer();
}

// Intersection Observerでカウントアップを実行
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const countupElements = entry.target.querySelectorAll('.countup');
            countupElements.forEach(element => {
                const target = parseFloat(element.dataset.target);
                countUp(element, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 実績セクションを監視
const achievementsContainer = document.querySelector('.achievements-container');
if (achievementsContainer) {
    observer.observe(achievementsContainer);
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Q&A アコーディオン機能
document.querySelectorAll('.qa-question').forEach(question => {
    question.addEventListener('click', function() {
        const qaItem = this.closest('.qa-item');
        const isActive = qaItem.classList.contains('active');

        // 他の開いているアイテムを閉じる
        document.querySelectorAll('.qa-item.active').forEach(item => {
            if (item !== qaItem) {
                item.classList.remove('active');
            }
        });

        // クリックされたアイテムの開閉を切り替え
        if (isActive) {
            qaItem.classList.remove('active');
        } else {
            qaItem.classList.add('active');
        }
    });
});
