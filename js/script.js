(function(){
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('main-menu');
    if(menuToggle && menu){
        menuToggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('show');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    document.querySelectorAll('.has-submenu > a').forEach(link => {
        link.addEventListener('click', e => {
            if(window.innerWidth <= 900){
                e.preventDefault();
                link.parentElement.classList.toggle('open');
            }
        });
    });

    const yearEl = document.getElementById('year');
    if(yearEl){
        yearEl.textContent = new Date().getFullYear();
    }

    const slider = document.querySelector('.slider');
    if(slider){
        const images = Array.from(slider.querySelectorAll('#slides img'));
        if(images.length > 0){
            let idx = 0;
            const overlayTitle = document.getElementById('slideTitle');
            const overlayText = document.getElementById('slideText');
            const captions = [
                {
                    title: 'Where Faith Meets Academic Excellence',
                    text: 'Papua New Guinea Christian Institute of Higher Education prepares servant leaders for National Capital District and Papua New Guinea.'
                },
                {
                    title: 'Hands-on Learning & Community Impact',
                    text: 'Students contribute to rural schools, health posts and community outreach.'
                },
                {
                    title: 'Modern Facilities in at Waigani Christian College',
                    text: 'Digital labs, smart classrooms and residential care ensure holistic formation.'
                }
            ];

            const showSlide = (pos) => {
                images.forEach((img, i) => img.classList.toggle('active', i === pos));
                const caption = captions[pos] || captions[0];
                if(overlayTitle){
                    overlayTitle.textContent = caption.title;
                }
                if(overlayText){
                    overlayText.textContent = caption.text;
                }
            };

            showSlide(idx);
            let timer = setInterval(() => {
                idx = (idx + 1) % images.length;
                showSlide(idx);
            }, 2500);

            slider.addEventListener('mouseenter', () => clearInterval(timer));
            slider.addEventListener('mouseleave', () => {
                timer = setInterval(() => {
                    idx = (idx + 1) % images.length;
                    showSlide(idx);
                }, 2500);
            });
        }
    }

    const showcaseGrid = document.getElementById('showcase-grid');
    if(showcaseGrid){
        const showcaseItems = [
            {
                type: 'image',
                src: 'images/facility1.jpg',
                title: 'Learning commons redesign',
                description: 'Students collaborate on capstone projects inside the refreshed digital commons.'
            },
            {
                type: 'image',
                src: 'images/carexpo2.jpg',
                title: 'career Expo presentations',
                description: '2025 Career, NCD, Port Moresby'
            },
            {
                type: 'image',
                src: 'images/stdcon2.jpg',
                title: 'New Classroom for the PNG CIHE University',
                description: 'Students introduced to new classroom block with smart technology and flexible seating.'
            },
            {
                type: 'image',
                src: 'images/12stdsassembly.jpg',
                title: 'Morning Assembly for Students',
                description: 'Students gather for morning assembly and devotion time on campus for secondary, primary and early childhood education.'
            },
            {
                type: 'video',
                src: 'https://www.youtube.com/embed/ADKyMT0EJEM',
                embed: true,
                title: 'From Humble Beginnings',
                description: 'Waigani Christian College to open doors for students and teachers to UOG'
            },
            {
                type: 'video',
                src: 'videos/bejhistory.mp4',
                embed: false,
                title: 'The expansion of School over the years',
                description: 'The Director of the Waigani Christain College, MP for North Wagi, Hon.Benjmain Mul,visiting the school and giving a brief history of the school and its expansion over the years.'
            }
        ];

        const renderShowcase = (filter = 'all') => {
            showcaseGrid.innerHTML = '';
            const filteredItems = showcaseItems.filter(item => filter === 'all' ? true : item.type === filter);
            if(filteredItems.length === 0){
                const message = document.createElement('p');
                message.textContent = 'More media moments are being curated. Please check back soon!';
                showcaseGrid.appendChild(message);
                return;
            }

            filteredItems.forEach(item => {
                const card = document.createElement('article');
                card.className = 'showcase-card';
                let mediaEl;
                if(item.type === 'video'){
                    if(item.embed){
                        mediaEl = document.createElement('iframe');
                        mediaEl.src = item.src;
                        mediaEl.title = item.title;
                        mediaEl.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                        mediaEl.allowFullscreen = true;
                    } else {
                        mediaEl = document.createElement('video');
                        mediaEl.controls = true;
                        const source = document.createElement('source');
                        source.src = item.src;
                        source.type = 'video/mp4';
                        mediaEl.appendChild(source);
                    }
                } else {
                    mediaEl = document.createElement('img');
                    mediaEl.src = item.src;
                    mediaEl.alt = item.title;
                }

                const heading = document.createElement('h3');
                heading.textContent = item.title;
                const desc = document.createElement('p');
                desc.textContent = item.description;

                card.appendChild(mediaEl);
                card.appendChild(heading);
                card.appendChild(desc);
                showcaseGrid.appendChild(card);
            });
        };

        renderShowcase();

        const tabs = document.querySelectorAll('.filter-tabs .tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(btn => {
                    btn.classList.toggle('active', btn === tab);
                    btn.setAttribute('aria-pressed', btn === tab ? 'true' : 'false');
                });
                renderShowcase(tab.dataset.filter);
            });
        });
    }

    document.querySelectorAll('.view-info').forEach(button => {
        const profileBody = button.closest('.profile-body');
        const details = profileBody ? profileBody.querySelector('.profile-details') : null;
        const icon = button.querySelector('i');

        if(!details){
            return;
        }

        button.addEventListener('click', () => {
            const shouldShow = details.hasAttribute('hidden');
            details.hidden = !shouldShow;
            button.setAttribute('aria-expanded', shouldShow ? 'true' : 'false');
            button.lastChild.textContent = shouldShow ? ' Hide info' : ' View info';
            if(icon){
                icon.classList.toggle('fa-eye', !shouldShow);
                icon.classList.toggle('fa-eye-slash', shouldShow);
            }
        });
    });
})();
