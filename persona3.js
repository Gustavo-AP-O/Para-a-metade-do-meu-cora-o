/* =========================================================
   PERSONA 3 — JAVASCRIPT
   LUCIELE × MIGUEL
========================================================= */


/* =========================================================
   01. ELEMENTOS
========================================================= */

const music =
    document.getElementById(
        "backgroundMusic"
    );

const musicControl =
    document.getElementById(
        "musicControl"
    );

const musicIcon =
    document.getElementById(
        "musicIcon"
    );

const musicText =
    document.getElementById(
        "musicText"
    );


const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const navigation =
    document.getElementById(
        "navigation"
    );


const nightButton =
    document.getElementById(
        "nightButton"
    );

const midnightSection =
    document.getElementById(
        "midnight"
    );


const currentTimeElement =
    document.getElementById(
        "currentTime"
    );

const countHours =
    document.getElementById(
        "countHours"
    );

const countMinutes =
    document.getElementById(
        "countMinutes"
    );

const countSeconds =
    document.getElementById(
        "countSeconds"
    );


const hourHand =
    document.getElementById(
        "hourHand"
    );

const minuteHand =
    document.getElementById(
        "minuteHand"
    );

const secondHand =
    document.getElementById(
        "secondHand"
    );


const darkHourButton =
    document.getElementById(
        "darkHourButton"
    );

const darkModal =
    document.getElementById(
        "darkModal"
    );

const darkClose =
    document.getElementById(
        "darkClose"
    );


const revealNight =
    document.getElementById(
        "revealNight"
    );

const nightMessage =
    document.getElementById(
        "nightMessage"
    );


const tiltElements =
    document.querySelectorAll(
        "[data-tilt]"
    );


/* =========================================================
   02. CONFIGURAÇÕES
========================================================= */

const BRAZIL_TIME_ZONE =
    "America/Sao_Paulo";


let previousCountdown = {

    hours:
        null,

    minutes:
        null,

    seconds:
        null

};


let midnightReached =
    false;


/* =========================================================
   03. MÚSICA
========================================================= */

let musicPlaying =
    false;


function updateMusicButton() {

    if (
        musicPlaying
    ) {

        musicIcon.textContent =
            "♫";

        musicText.textContent =
            "MÚSICA ON";

    } else {

        musicIcon.textContent =
            "♪";

        musicText.textContent =
            "MÚSICA";
    }
}


async function startMusic() {

    try {

        music.volume =
            0.28;


        await music.play();


        musicPlaying =
            true;


        updateMusicButton();

    } catch (error) {

        musicPlaying =
            false;


        updateMusicButton();
    }
}


musicControl.addEventListener(
    "click",
    async () => {

        if (
            music.paused
        ) {

            try {

                await music.play();

                musicPlaying =
                    true;

            } catch (error) {

                musicPlaying =
                    false;
            }

        } else {

            music.pause();

            musicPlaying =
                false;
        }


        updateMusicButton();
    }
);


/*
    Primeira tentativa.
*/

startMusic();


/*
    Primeira interação,
    caso autoplay seja bloqueado.
*/

const retryMusic =
    async () => {

        if (
            !musicPlaying
        ) {

            try {

                await music.play();

                musicPlaying =
                    true;

                updateMusicButton();

            } catch (error) {

                /*
                    O navegador ainda bloqueou.
                */
            }
        }
    };


document.addEventListener(
    "click",
    retryMusic,
    {
        once:
            true
    }
);


document.addEventListener(
    "touchstart",
    retryMusic,
    {
        once:
            true
    }
);


/* =========================================================
   04. MENU
========================================================= */

menuToggle.addEventListener(
    "click",
    () => {

        navigation.classList.toggle(
            "open"
        );

    }
);


navigation
    .querySelectorAll("a")
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "open"
                    );

                }
            );

        }
    );


/* =========================================================
   05. FORMATAR NÚMEROS
========================================================= */

function pad(
    value
) {

    return String(
        value
    ).padStart(
        2,
        "0"
    );
}


/* =========================================================
   06. ANIMAÇÃO DOS NÚMEROS
========================================================= */

function animateCountdownNumber(
    element,
    value,
    key
) {

    if (
        previousCountdown[key] !== null &&
        previousCountdown[key] !== value
    ) {

        const card =
            element.closest(
                ".countdown-card"
            );


        if (
            card
        ) {

            card.classList.remove(
                "changed"
            );


            void card.offsetWidth;


            card.classList.add(
                "changed"
            );
        }
    }


    previousCountdown[key] =
        value;


    element.textContent =
        pad(value);
}


/* =========================================================
   07. HORA ATUAL
========================================================= */

function getCurrentTime() {

    const formatter =
        new Intl.DateTimeFormat(
            "en-GB",
            {
                timeZone:
                    BRAZIL_TIME_ZONE,

                hour:
                    "2-digit",

                minute:
                    "2-digit",

                second:
                    "2-digit",

                hour12:
                    false
            }
        );


    return formatter.format(
        new Date()
    );
}


/* =========================================================
   08. DATA/HORA DE SÃO PAULO
========================================================= */

function getSaoPauloDateParts() {

    const formatter =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone:
                    BRAZIL_TIME_ZONE,

                year:
                    "numeric",

                month:
                    "2-digit",

                day:
                    "2-digit",

                hour:
                    "2-digit",

                minute:
                    "2-digit",

                second:
                    "2-digit",

                hour12:
                    false
            }
        );


    const parts =
        formatter.formatToParts(
            new Date()
        );


    const values =
        {};


    parts.forEach(
        (part) => {

            if (
                part.type !==
                "literal"
            ) {

                values[
                    part.type
                ] =
                    Number(
                        part.value
                    );
            }

        }
    );


    /*
        Alguns ambientes podem
        devolver hora 24 em Intl.
    */

    if (
        values.hour === 24
    ) {

        values.hour = 0;
    }


    return values;
}


/* =========================================================
   09. CALCULAR ATÉ MEIA-NOITE
========================================================= */

function getSecondsUntilMidnight() {

    const parts =
        getSaoPauloDateParts();


    const nowSeconds =
        (
            parts.hour * 60 * 60
        ) +
        (
            parts.minute * 60
        ) +
        parts.second;


    const totalDaySeconds =
        24 * 60 * 60;


    let remaining =
        totalDaySeconds -
        nowSeconds;


    /*
        Evita mostrar 24:00:00
        exatamente na virada.
    */

    if (
        remaining >=
        totalDaySeconds
    ) {

        remaining =
            0;
    }


    return remaining;
}


/* =========================================================
   10. ATUALIZAR COUNTDOWN
========================================================= */

function updateCountdown() {

    const remaining =
        getSecondsUntilMidnight();


    /*
        Quando chega exatamente
        na meia-noite.
    */

    if (
        remaining === 0
    ) {

        handleMidnightReached();

        return;
    }


    const hours =
        Math.floor(
            remaining /
            3600
        );


    const minutes =
        Math.floor(
            (
                remaining %
                3600
            ) /
            60
        );


    const seconds =
        remaining %
        60;


    animateCountdownNumber(
        countHours,
        hours,
        "hours"
    );


    animateCountdownNumber(
        countMinutes,
        minutes,
        "minutes"
    );


    animateCountdownNumber(
        countSeconds,
        seconds,
        "seconds"
    );


    currentTimeElement.textContent =
        getCurrentTime();
}


/* =========================================================
   11. ATUALIZAR RELÓGIO ANALÓGICO
========================================================= */

function updateAnalogClock() {

    const parts =
        getSaoPauloDateParts();


    const hour =
        parts.hour %
        12;


    const minute =
        parts.minute;


    const second =
        parts.second;


    const secondDegrees =
        second *
        6;


    const minuteDegrees =
        (
            minute +
            second / 60
        ) *
        6;


    const hourDegrees =
        (
            hour +
            minute / 60
        ) *
        30;


    secondHand.style.transform =
        `
        translateX(-50%)
        rotate(${secondDegrees}deg)
        `;


    minuteHand.style.transform =
        `
        translateX(-50%)
        rotate(${minuteDegrees}deg)
        `;


    hourHand.style.transform =
        `
        translateX(-50%)
        rotate(${hourDegrees}deg)
        `;
}


/* =========================================================
   12. MEIA-NOITE ATINGIDA
========================================================= */

function handleMidnightReached() {

    if (
        midnightReached
    ) {

        return;
    }


    midnightReached =
        true;


    /*
        Muda o estado visual.
    */

    document.body.classList.add(
        "dark-hour-active"
    );


    currentTimeElement.textContent =
        "00:00:00";


    countHours.textContent =
        "00";


    countMinutes.textContent =
        "00";


    countSeconds.textContent =
        "00";


    /*
        Mostra o Dark Hour.
    */

    openDarkHour();


    /*
        Depois de alguns segundos,
        prepara o contador para o
        novo dia.
    */

    setTimeout(
        () => {

            midnightReached =
                false;

            document.body.classList.remove(
                "dark-hour-active"
            );

            updateCountdown();

        },
        4500
    );
}


/* =========================================================
   13. LOOP DO RELÓGIO
========================================================= */

function updateClocks() {

    updateCountdown();

    updateAnalogClock();
}


updateClocks();


setInterval(
    updateClocks,
    1000
);


/* =========================================================
   14. BOTÃO ESPERAR A NOITE
========================================================= */

nightButton.addEventListener(
    "click",
    () => {

        midnightSection.scrollIntoView({
            behavior:
                "smooth"
        });

    }
);


/* =========================================================
   15. ABRIR DARK HOUR
========================================================= */

function openDarkHour() {

    darkModal.classList.add(
        "open"
    );


    darkModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";
}


/* =========================================================
   16. FECHAR DARK HOUR
========================================================= */

function closeDarkHour() {

    darkModal.classList.remove(
        "open"
    );


    darkModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


darkClose.addEventListener(
    "click",
    closeDarkHour
);


document
    .querySelector(
        ".dark-backdrop"
    )
    .addEventListener(
        "click",
        closeDarkHour
    );


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            "Escape"
        ) {

            closeDarkHour();
        }
    }
);


/* =========================================================
   17. BOTÃO ATIVAR DARK HOUR
========================================================= */

darkHourButton.addEventListener(
    "click",
    () => {

        document.body.classList.add(
            "dark-hour-active"
        );


        openDarkHour();
    }
);


/* =========================================================
   18. REVELAÇÃO FINAL
========================================================= */

revealNight.addEventListener(
    "click",
    () => {

        nightMessage.classList.add(
            "show"
        );


        revealNight.textContent =
            "ARQUIVO DESBLOQUEADO";


        nightMessage.animate(
            [
                {
                    transform:
                        "translateY(15px) scale(0.98)"
                },

                {
                    transform:
                        "translateY(-3px) scale(1.015)"
                },

                {
                    transform:
                        "translateY(0) scale(1)"
                }
            ],
            {
                duration:
                    500,

                easing:
                    "ease-out"
            }
        );
    }
);


/* =========================================================
   19. TILT DA FOTO
========================================================= */

if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    tiltElements.forEach(
        (element) => {

            element.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        element.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height;


                    const rotateY =
                        (
                            x -
                            0.5
                        ) *
                        8;


                    const rotateX =
                        (
                            y -
                            0.5
                        ) *
                        -8;


                    element.style.transform =
                        `
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        scale(1.015)
                        `;
                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.transform =
                        "rotate(3deg)";
                }
            );

        }
    );
}


/* =========================================================
   20. APARECER AO ROLAR
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".diary-card, .countdown-wrapper, .memory-copy, .memory-photo, .timeline-card, .reveal-content"
    );


revealElements.forEach(
    (element) => {

        element.classList.add(
            "scroll-hidden"
        );
    }
);


const scrollObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "scroll-visible"
                        );


                        scrollObserver.unobserve(
                            entry.target
                        );
                    }

                }
            );

        },
        {
            threshold:
                0.08
        }
    );


revealElements.forEach(
    (element) => {

        scrollObserver.observe(
            element
        );
    }
);


/* =========================================================
   21. CSS DAS ANIMAÇÕES DE SCROLL
========================================================= */

const scrollStyle =
    document.createElement(
        "style"
    );


scrollStyle.textContent = `

    .scroll-hidden {
        opacity: 0;

        transform:
            translateY(35px);

        transition:
            opacity 0.75s ease,
            transform 0.75s ease;
    }

    .scroll-visible {
        opacity: 1;

        transform:
            translateY(0);
    }

`;


document.head.appendChild(
    scrollStyle
);


/* =========================================================
   22. QUANDO A PÁGINA ENTRA NO DARK HOUR
========================================================= */

function checkSpecialMidnightState() {

    const parts =
        getSaoPauloDateParts();


    /*
        Nos primeiros segundos
        depois da meia-noite,
        deixa uma pequena margem
        para detectar a virada.
    */

    if (
        parts.hour === 0 &&
        parts.minute === 0 &&
        parts.second <= 2
    ) {

        if (
            !midnightReached
        ) {

            handleMidnightReached();
        }
    }
}


setInterval(
    checkSpecialMidnightState,
    1000
);


/* =========================================================
   23. PARALLAX LEVE DO CÉU
========================================================= */

const moon =
    document.querySelector(
        ".moon"
    );

const moonGlow =
    document.querySelector(
        ".moon-glow"
    );


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


            moon.style.transform =
                `
                translate(
                    ${x * -10}px,
                    ${y * -8}px
                )
                `;


            moonGlow.style.transform =
                `
                translate(
                    ${x * -18}px,
                    ${y * -12}px
                )
                `;
        }
    );
}


/* =========================================================
   24. INICIALIZAÇÃO
========================================================= */

currentTimeElement.textContent =
    getCurrentTime();


updateCountdown();

updateAnalogClock();