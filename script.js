/* =========================================
   CONFIGURAÇÕES
========================================= */

const START_DATE = new Date(
    "2025-07-23T09:00:00-03:00"
);


/* =========================================
   ELEMENTOS
========================================= */

const yearsElement =
    document.getElementById("years");

const monthsElement =
    document.getElementById("months");

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


const music =
    document.getElementById("backgroundMusic");

const musicControl =
    document.getElementById("musicControl");

const musicIcon =
    document.getElementById("musicIcon");

const musicText =
    document.getElementById("musicText");


const menuToggle =
    document.getElementById("menuToggle");

const navigation =
    document.getElementById("navigation");


/* =========================================
   CONTADOR
========================================= */

/*
    Calcula a diferença real entre duas datas.

    Não transforma tudo em segundos.
    Assim conseguimos mostrar:

    X anos
    X meses
    X dias
    X horas
    X minutos
    X segundos
*/

function calculateRelationshipTime(startDate, endDate) {

    if (endDate < startDate) {

        return {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }


    let years =
        endDate.getFullYear() -
        startDate.getFullYear();


    let months =
        endDate.getMonth() -
        startDate.getMonth();


    let days =
        endDate.getDate() -
        startDate.getDate();


    let hours =
        endDate.getHours() -
        startDate.getHours();


    let minutes =
        endDate.getMinutes() -
        startDate.getMinutes();


    let seconds =
        endDate.getSeconds() -
        startDate.getSeconds();


    /*
        Ajuste de segundos
    */

    if (seconds < 0) {

        seconds += 60;
        minutes--;
    }


    /*
        Ajuste de minutos
    */

    if (minutes < 0) {

        minutes += 60;
        hours--;
    }


    /*
        Ajuste de horas
    */

    if (hours < 0) {

        hours += 24;
        days--;
    }


    /*
        Se os dias ficaram negativos,
        pegamos os dias do mês anterior.
    */

    if (days < 0) {

        const previousMonth =
            new Date(
                endDate.getFullYear(),
                endDate.getMonth(),
                0
            );

        days +=
            previousMonth.getDate();

        months--;
    }


    /*
        Ajuste de meses
    */

    if (months < 0) {

        months += 12;
        years--;
    }


    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    };
}


/* =========================================
   ATUALIZAR CONTADOR
========================================= */

const previousValues = {
    years: null,
    months: null,
    days: null,
    hours: null,
    minutes: null,
    seconds: null
};


function animateNumber(
    element,
    value,
    key
) {

    if (
        previousValues[key] !== null &&
        previousValues[key] !== value
    ) {

        const card =
            element.closest(".counter-card");

        card.classList.remove("changed");

        /*
            Força o navegador a recalcular
            a animação.
        */

        void card.offsetWidth;

        card.classList.add("changed");
    }


    previousValues[key] = value;

    element.textContent =
        String(value).padStart(2, "0");
}


function updateCounter() {

    const now =
        new Date();

    const time =
        calculateRelationshipTime(
            START_DATE,
            now
        );


    animateNumber(
        yearsElement,
        time.years,
        "years"
    );


    animateNumber(
        monthsElement,
        time.months,
        "months"
    );


    animateNumber(
        daysElement,
        time.days,
        "days"
    );


    animateNumber(
        hoursElement,
        time.hours,
        "hours"
    );


    animateNumber(
        minutesElement,
        time.minutes,
        "minutes"
    );


    animateNumber(
        secondsElement,
        time.seconds,
        "seconds"
    );
}


updateCounter();

setInterval(
    updateCounter,
    1000
);


/* =========================================
   MÚSICA
========================================= */

let musicPlaying = false;


/*
    O navegador pode bloquear autoplay.

    Por isso tentamos tocar imediatamente.
    Caso seja bloqueado, o primeiro clique/toque
    na página tenta iniciar novamente.
*/

async function startMusic() {

    try {

        music.volume = 0.28;

        await music.play();

        musicPlaying = true;

        updateMusicButton();

    } catch (error) {

        musicPlaying = false;

        updateMusicButton();
    }
}


function updateMusicButton() {

    if (musicPlaying) {

        musicIcon.textContent = "♫";
        musicText.textContent = "MÚSICA ON";

    } else {

        musicIcon.textContent = "♪";
        musicText.textContent = "MÚSICA";
    }
}


musicControl.addEventListener(
    "click",
    async () => {

        if (music.paused) {

            try {

                await music.play();

                musicPlaying = true;

            } catch (error) {

                musicPlaying = false;
            }

        } else {

            music.pause();

            musicPlaying = false;
        }

        updateMusicButton();
    }
);


/*
    Primeira tentativa de autoplay.
*/

startMusic();


/*
    Se o navegador bloquear o autoplay,
    qualquer interação do usuário tenta iniciar.

    Usamos { once: true } para não deixar
    vários listeners ativos.
*/

const tryMusicAfterInteraction =
    async () => {

        if (!musicPlaying) {

            try {

                await music.play();

                musicPlaying = true;

                updateMusicButton();

            } catch (error) {
                // O navegador continua bloqueando.
            }
        }
    };


document.addEventListener(
    "click",
    tryMusicAfterInteraction,
    {
        once: true
    }
);

document.addEventListener(
    "touchstart",
    tryMusicAfterInteraction,
    {
        once: true
    }
);


/* =========================================
   MENU MOBILE
========================================= */

menuToggle.addEventListener(
    "click",
    () => {

        navigation.classList.toggle(
            "open"
        );
    }
);


/*
    Fecha o menu quando o usuário
    escolhe uma página.
*/

navigation
    .querySelectorAll("a")
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                navigation.classList.remove(
                    "open"
                );
            }
        );
    });


/* =========================================
   PARTICULAS
========================================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let particles = [];

let mouse = {
    x: null,
    y: null
};


function resizeCanvas() {

    canvas.width =
        window.innerWidth *
        window.devicePixelRatio;

    canvas.height =
        window.innerHeight *
        window.devicePixelRatio;

    canvas.style.width =
        `${window.innerWidth}px`;

    canvas.style.height =
        `${window.innerHeight}px`;

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );
}


function createParticles() {

    particles = [];


    /*
        Diminui quantidade em celulares
        para manter desempenho.
    */

    const amount =
        window.innerWidth < 700
            ? 45
            : 90;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            size:
                Math.random() * 1.7 + 0.4,

            speed:
                Math.random() * 0.3 + 0.08,

            opacity:
                Math.random() * 0.5 + 0.1,

            drift:
                (Math.random() - 0.5) * 0.2
        });
    }
}


function drawParticles() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    particles.forEach((particle) => {

        particle.y -=
            particle.speed;

        particle.x +=
            particle.drift;


        /*
            Reaparece no final.
        */

        if (particle.y < -10) {

            particle.y =
                window.innerHeight + 10;
        }


        if (particle.x < -10) {

            particle.x =
                window.innerWidth + 10;

        } else if (
            particle.x >
            window.innerWidth + 10
        ) {

            particle.x = -10;
        }


        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(
                194,
                153,
                255,
                ${particle.opacity}
            )`;

        ctx.fill();
    });


    requestAnimationFrame(
        drawParticles
    );
}


window.addEventListener(
    "resize",
    () => {

        resizeCanvas();

        createParticles();
    }
);


resizeCanvas();
createParticles();
drawParticles();


/* =========================================
   MOVIMENTO SUTIL DO HERO
========================================= */

const hero =
    document.querySelector(".hero");

if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (
                    event.clientX /
                    window.innerWidth
                ) - 0.5;

            const y =
                (
                    event.clientY /
                    window.innerHeight
                ) - 0.5;


            hero.style.transform =
                `translate(
                    ${x * 2}px,
                    ${y * 2}px
                )`;
        }
    );
}