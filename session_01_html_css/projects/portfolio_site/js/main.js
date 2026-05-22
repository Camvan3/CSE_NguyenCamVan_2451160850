const skillBars = document.querySelectorAll('.skill-progress');

const animateOnScroll = () => {
    skillBars.forEach(bar => {
 
        const rect = bar.getBoundingClientRect();
        
  
        if(rect.top < window.innerHeight) {
   
            const percentage = bar.getAttribute('data-percent');
            bar.style.width = percentage;
        }
    });
};


window.addEventListener('scroll', animateOnScroll);