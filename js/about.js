// About page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add custom styles for about page
    const additionalStyles = `
        .page-header {
            background: linear-gradient(135deg, rgba(255, 153, 51, 0.9), rgba(19, 136, 8, 0.9)), url('https://images.pexels.com/photos/4226262/pexels-photo-4226262.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover;
            color: white;
            padding: 100px 0;
            text-align: center;
        }
        
        .breadcrumb {
            background: none;
            padding: 0;
            margin: 0;
        }
        
        .breadcrumb-item a {
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
        }
        
        .breadcrumb-item.active {
            color: white;
        }
        
        .about-section {
            padding: 80px 0;
        }
        
        .stats-row h3 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .vision-point {
            display: flex;
            align-items: flex-start;
            margin-bottom: 2rem;
        }
        
        .vision-point i {
            font-size: 2rem;
            margin-top: 0.5rem;
        }
        
        .vision-point h5 {
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .value-card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            height: 100%;
        }
        
        .value-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        
        .value-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 1.5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--saffron), var(--green));
            color: white;
            font-size: 2rem;
        }
        
        .value-card h4 {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--dark);
            margin-bottom: 1rem;
        }
        
        .team-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            height: 100%;
        }
        
        .team-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        
        .team-image {
            height: 300px;
            overflow: hidden;
        }
        
        .team-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .team-card:hover .team-image img {
            transform: scale(1.05);
        }
        
        .team-content {
            padding: 2rem;
        }
        
        .team-content h5 {
            font-weight: 600;
            color: var(--dark);
            margin-bottom: 0.5rem;
        }
        
        .designation {
            color: var(--saffron);
            font-weight: 500;
            margin-bottom: 1rem;
        }
        
        .bio {
            color: var(--gray);
            font-size: 0.9rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .team-content .social-links {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
        }
        
        .team-content .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 35px;
            background: rgba(255, 153, 51, 0.1);
            border-radius: 50%;
            color: var(--saffron);
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }
        
        .team-content .social-link:hover {
            background: var(--saffron);
            color: white;
        }
    `;
    
    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
    
    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statsNumbers = entry.target.querySelectorAll('.stats-row h3');
                statsNumbers.forEach(stat => {
                    animateNumber(stat);
                });
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.stats-row');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Number animation function
    function animateNumber(element) {
        const target = element.textContent;
        const isNumber = target.match(/\d+/);
        
        if (isNumber) {
            const number = parseInt(isNumber[0]);
            const suffix = target.replace(number.toString(), '');
            let current = 0;
            const increment = number / 30;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    element.textContent = number + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + suffix;
                }
            }, 50);
        }
    }
    
    // Animate elements on scroll
    const fadeElements = document.querySelectorAll('.value-card, .team-card, .vision-point');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });
});