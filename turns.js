// Setup Ambient Floating Particles
document.addEventListener('DOMContentLoaded', function () {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 45;
    const shapes = ['🎈', '🎉', '🎂', '🎁', '✨', '💖', '🌸', '💫', '❤️'];

    for (let i = 0; i < particleCount; i++) {
        createAmbientParticle();
    }

    function createAmbientParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        particle.className = 'particle';

        // Random properties for organic feel
        const size = Math.random() * 20 + 10;
        particle.style.fontSize = size + 'px';
        particle.style.left = Math.random() * 100 + 'vw';

        const duration = Math.random() * 15 + 15; // 15s to 30s
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = (Math.random() * 10 - 5) + 's';

        particlesContainer.appendChild(particle);
    }
});

// Logic for Gift Reveal
function revealGift() {
    const gift = document.getElementById('giftWrapper');
    const cakeScene = document.getElementById('cakeScene');

    // Add animation class
    gift.classList.add('opened');

    // Trigger spectacular burst
    triggerBurst(40); // Initial smaller burst

    // Transition to Cake scene
    setTimeout(() => {
        gift.style.display = 'none';
        cakeScene.classList.add('active');
    }, 900);
}

// Orchestrate the Cake Cutting Sequence
function cutCakeSequence() {
    const cakeWrapper = document.getElementById('cakeWrapper');
    const cakeContainer = document.getElementById('cakeContainer');
    const knife = document.getElementById('cakeKnife');
    const instruction = document.getElementById('cakeInstruction');
    const card = document.getElementById('birthdayCard');
    const cakeScene = document.getElementById('cakeScene');

    // Prevent multiple clicks
    if (cakeWrapper.classList.contains('cut')) return;

    // 1. Hide instruction text
    instruction.style.opacity = '0';

    // 2. Blow out the candles with a smooth transition
    const flames = document.querySelectorAll('.svg-flame, .svg-flame-glow');
    flames.forEach(f => {
        f.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        f.style.opacity = '0';
        f.style.transform = 'scale(0)';
    });

    // 3. Bring down the beautiful vector knife
    setTimeout(() => {
        knife.classList.add('slashing');
    }, 600);

    // 4. Knife hits cake -> Brief shake force impact
    setTimeout(() => {
        cakeContainer.classList.add('shaking');
    }, 1400);

    // 5. Knife completely cuts, trigger split, magical light burst and confetti
    setTimeout(() => {
        cakeContainer.classList.remove('shaking');
        cakeWrapper.classList.add('cut');

        // Add magical light burst from the core of the split
        const light = document.createElement('div');
        light.className = 'magical-light';
        cakeScene.appendChild(light);

        // Huge Confetti Burst
        triggerBurst(100);
    }, 1700);

    // 6. Fade out Cake Scene and reveal the Birthday Card elegantly
    setTimeout(() => {
        cakeScene.style.transition = 'opacity 1.5s ease';
        cakeScene.style.opacity = '0';
        setTimeout(() => {
            cakeScene.style.display = 'none';
            card.classList.add('show');
            startSlideshow();
        }, 1500);
    }, 4500); // Plenty of time to enjoy the split animation
}

// Spectacular Heart & Confetti Burst Effect
function triggerBurst(count) {
    const burstCount = count || 60;
    const burstEmojis = ['🎈', '🎉', '✨', '💖', '🎁', '🎊', '❤️'];
    for (let i = 0; i < burstCount; i++) {
        const burstItem = document.createElement('div');
        burstItem.className = 'burst-heart';
        burstItem.innerHTML = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];

        // Position at center
        burstItem.style.left = '50%';
        burstItem.style.top = '50%';
        burstItem.style.transform = 'translate(-50%, -50%)';
        burstItem.style.fontSize = (Math.random() * 25 + 15) + 'px';

        // Physics calculation for burst
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 80;
        const tx = Math.cos(angle) * velocity;
        // Add a gravity arc feel by shifting Y negative
        const ty = Math.sin(angle) * velocity - 150;

        burstItem.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 1, offset: 0.2 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.8) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 1200 + 1000,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            fill: 'forwards'
        });

        document.body.appendChild(burstItem);

        // Cleanup
        setTimeout(() => burstItem.remove(), 2500);
    }
}

// Slideshow Logic for romantic quotes
let currentSlideIdx = 0;
function startSlideshow() {
    const slides = document.querySelectorAll('.slide-text');
    if (slides.length === 0) return;

    setInterval(() => {
        slides[currentSlideIdx].classList.remove('active');
        currentSlideIdx = (currentSlideIdx + 1) % slides.length;
        slides[currentSlideIdx].classList.add('active');
    }, 3500); // Change text every 3.5 seconds
}

// Modal Logic

let initialized = false;
function openMessageModal() {
    // document.getElementById('messageModal').classList.add('active');
    // setTimeout(function () {
    //     if (window.initFlipbook) window.initFlipbook();
    // }, 300);

    document.getElementById('modal').classList.add('active');

    setTimeout(() => {
        if (!initialized) {
            $('#book').turn({
                width: 600,
                height: 400,
                autoCenter: true,
                display: 'double',
                duration: 1200,
                elevation: 80,
                gradients: true
            });
            initialized = true;
        }
    }, 300);
}

function closeMessageModal() {
    document.getElementById('modal').classList.remove('active');
}

function closeBook() {
    // Close the modal and ensure we return to the birthday card
    const modal = document.getElementById('modal');
    const card = document.getElementById('birthdayCard');
    
    modal.classList.remove('active');
    
    // Ensure birthday card is visible
    if (card && card.classList.contains('show')) {
        // Fade in the card smoothly
        card.style.opacity = '1';
    }
}

// Initialize Cake DOM Structure (Clone identical tiers into left and right halves for clip-path splitting)
document.addEventListener('DOMContentLoaded', () => {
    const cakeDOM = `
<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#cccccc"/>
    </linearGradient>
    <linearGradient id="plateRimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e0e0e0"/>
      <stop offset="100%" stop-color="#999999"/>
    </linearGradient>
    <linearGradient id="bottomTierGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8e1e55"/>
      <stop offset="50%" stop-color="#c12973"/>
      <stop offset="100%" stop-color="#69143e"/>
    </linearGradient>
    <linearGradient id="bottomTierTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dc3e8a"/>
      <stop offset="100%" stop-color="#aa2463"/>
    </linearGradient>
    <linearGradient id="topTierGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#eac6d0"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#d9b1bd"/>
    </linearGradient>
    <linearGradient id="topTierTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fdf0f4"/>
    </linearGradient>
    <linearGradient id="dripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fae3eb"/>
    </linearGradient>
    <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#dddddd"/>
    </linearGradient>
    <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff178" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#ff9800" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#ff0000" stop-opacity="0"/>
    </radialGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="5" stdDeviation="5" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- Plate -->
  <ellipse cx="100" cy="180" rx="95" ry="20" fill="url(#plateRimGrad)" filter="url(#dropShadow)"/>
  <ellipse cx="100" cy="177" rx="85" ry="16" fill="url(#plateGrad)"/>
  
  <!-- Shadow under bottom tier -->
  <ellipse cx="100" cy="170" rx="70" ry="18" fill="#501030" opacity="0.6" filter="url(#dropShadow)"/>
  
  <!-- BOTTOM TIER -->
  <path d="M 30 120 L 30 170 A 70 18 0 0 0 170 170 L 170 120 Z" fill="url(#bottomTierGrad)"/>
  <ellipse cx="100" cy="120" rx="70" ry="18" fill="url(#bottomTierTopGrad)"/>
  
  <!-- Bottom Icing Detail -->
  <g fill="#ffeaf0" filter="url(#dropShadow)">
    <circle cx="35" cy="170" r="5"/><circle cx="45" cy="174" r="5"/><circle cx="55" cy="177" r="5"/><circle cx="65" cy="180" r="5"/>
    <circle cx="75" cy="182" r="5"/><circle cx="85" cy="183.5" r="5"/><circle cx="95" cy="184.5" r="5"/><circle cx="105" cy="184.5" r="5"/>
    <circle cx="115" cy="183.5" r="5"/><circle cx="125" cy="182" r="5"/><circle cx="135" cy="180" r="5"/><circle cx="145" cy="177" r="5"/>
    <circle cx="155" cy="174" r="5"/><circle cx="165" cy="170" r="5"/>
  </g>

  <!-- TOP TIER -->
  <path d="M 45 75 L 45 120 A 55 14 0 0 0 155 120 L 155 75 Z" fill="url(#topTierGrad)"/>
  <ellipse cx="100" cy="75" rx="55" ry="14" fill="url(#topTierTopGrad)"/>

  <!-- Drips using exact SVG Path -->
  <path d="M 45 75 A 55 14 0 0 0 155 75 C 155 85, 150 90, 145 80 C 140 105, 135 105, 130 85 C 125 90, 120 110, 115 88 C 110 95, 100 95, 95 85 C 90 100, 80 115, 75 90 C 70 80, 65 105, 60 85 C 55 90, 50 85, 45 75 Z" fill="url(#dripGrad)" filter="url(#dropShadow)"/>

  <!-- Sprinkles -->
  <g stroke-linecap="round" stroke-width="3">
    <line x1="100" y1="65" x2="105" y2="67" stroke="#ff4d4d"/>
    <line x1="80" y1="70" x2="83" y2="75" stroke="#3498db"/>
    <line x1="120" y1="72" x2="125" y2="70" stroke="#f1c40f"/>
    <line x1="110" y1="80" x2="105" y2="83" stroke="#9b59b6"/>
    <line x1="70" y1="78" x2="75" y2="76" stroke="#2ecc71"/>
    <line x1="90" y1="76" x2="88" y2="80" stroke="#ff4d4d"/>
    <line x1="135" y1="78" x2="132" y2="80" stroke="#e67e22"/>
  </g>

  <!-- CANDLE -->
  <ellipse cx="100" cy="75" rx="10" ry="3" fill="#e0d5d8"/>
  <rect x="94" y="30" width="12" height="45" fill="url(#candleGrad)" rx="2"/>
  <path d="M 94 35 L 106 45 M 94 45 L 106 55 M 94 55 L 106 65 M 94 65 L 106 75" stroke="#ff4d4d" stroke-width="3"/>
  <line x1="100" y1="30" x2="100" y2="24" stroke="#333" stroke-width="2"/>
  
  <!-- FLAME -->
  <circle cx="100" cy="15" r="15" fill="url(#flameGlow)" class="svg-flame-glow"/>
  <g class="svg-flame">
    <path d="M 100 8 Q 104 18 100 24 Q 96 18 100 8 Z" fill="#ffeb3b"/>
    <path d="M 100 12 Q 102 18 100 22 Q 98 18 100 12 Z" fill="#ffffff"/>
  </g>
</svg>
            `;

    document.getElementById('cakeLeft').innerHTML = cakeDOM;
    document.getElementById('cakeRight').innerHTML = cakeDOM;

});



