/* =========================================
   ÁUDIO
========================================= */

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

let musicPlaying = false;


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

        musicText.textContent =
            "MÚSICA ON";

    } else {

        musicIcon.textContent = "♪";

        musicText.textContent =
            "MÚSICA";
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
    Caso o navegador bloqueie,
    tenta novamente no primeiro toque/clique.
*/

const retryMusic =
    async () => {

        if (!musicPlaying) {

            try {

                await music.play();

                musicPlaying = true;

                updateMusicButton();

            } catch (error) {
                // Autoplay ainda bloqueado.
            }
        }
    };


document.addEventListener(
    "click",
    retryMusic,
    {
        once: true
    }
);

document.addEventListener(
    "touchstart",
    retryMusic,
    {
        once: true
    }
);


/* =========================================
   MENU MOBILE
========================================= */

const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const navigation =
    document.getElementById(
        "navigation"
    );


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
   INVESTIGAÇÃO
========================================= */

const clueButtons =
    document.querySelectorAll(
        ".clue-button"
    );

const clueModal =
    document.getElementById(
        "clueModal"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalText =
    document.getElementById(
        "modalText"
    );


const clues = {

    1: {
        title: "O ENCONTRO",
        text:
            "Toda história precisa de um primeiro momento. O de vocês talvez parecesse apenas mais um instante entre tantos outros. Só que, olhando agora, dá para perceber que aquele momento era o começo de alguma coisa muito maior."
    },

    2: {
        title: "AS MEMÓRIAS",
        text:
            "As pistas começaram a aparecer com o tempo: as conversas, as risadas, as mensagens inesperadas e aqueles pequenos momentos que ninguém imaginaria guardar. No fim, são justamente essas coisas que tornam uma história única."
    },

    3: {
        title: "O AGORA",
        text:
            "A investigação chegou ao ponto principal. Não existe uma resposta escondida em algum lugar distante. Ela está nas memórias que vocês criaram, no tempo que passou e em tudo aquilo que ainda está por acontecer."
    }

};


clueButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".case-card"
                    );

                const clueId =
                    card.dataset.clue;

                const clue =
                    clues[clueId];


                modalTitle.textContent =
                    clue.title;

                modalText.textContent =
                    clue.text;


                clueModal.classList.add(
                    "open"
                );

                clueModal.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body.style.overflow =
                    "hidden";
            }
        );
    }
);


/* =========================================
   FECHAR MODAL
========================================= */

function closeModal() {

    clueModal.classList.remove(
        "open"
    );

    clueModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


modalClose.addEventListener(
    "click",
    closeModal
);


document
    .querySelector(".modal-backdrop")
    .addEventListener(
        "click",
        closeModal
    );


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeModal();
        }
    }
);


/* =========================================
   INVESTIGAÇÃO HERO
========================================= */

const startInvestigation =
    document.getElementById(
        "startInvestigation"
    );

const truthSection =
    document.querySelector(
        ".truth-section"
    );


startInvestigation.addEventListener(
    "click",
    () => {

        truthSection.scrollIntoView({
            behavior: "smooth"
        });
    }
);


/* =========================================
   REVELAÇÃO FINAL
========================================= */

const revealButton =
    document.getElementById(
        "revealButton"
    );

const finalMessage =
    document.getElementById(
        "finalMessage"
    );


revealButton.addEventListener(
    "click",
    () => {

        finalMessage.classList.add(
            "show"
        );


        revealButton.textContent =
            "ARQUIVO DESBLOQUEADO";


        /*
            Pequeno efeito de destaque.
        */

        finalMessage.animate(
            [
                {
                    transform:
                        "scale(0.96)"
                },

                {
                    transform:
                        "scale(1.02)"
                },

                {
                    transform:
                        "scale(1)"
                }
            ],
            {
                duration: 500,
                easing: "ease-out"
            }
        );
    }
);


/* =========================================
   EFEITO DO TV
========================================= */

const tvScreen =
    document.querySelector(
        ".tv-screen"
    );


setInterval(
    () => {

        if (
            !tvScreen.matches(
                ":hover"
            )
        ) {

            const flash =
                Math.random() > 0.72;


            if (flash) {

                tvScreen.animate(
                    [
                        {
                            filter:
                                "brightness(1)"
                        },

                        {
                            filter:
                                "brightness(1.65)"
                        },

                        {
                            filter:
                                "brightness(1)"
                        }
                    ],
                    {
                        duration: 180
                    }
                );
            }
        }

    },
    1500
);


/* =========================================
   APARECIMENTO AO ROLAR
========================================= */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                }
            );
        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(
        ".case-card, .terminal-window, .reveal-content"
    )
    .forEach(
        (element) => {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            observer.observe(
                element
            );
        }
    );


const visibilityStyle =
    document.createElement(
        "style"
    );


visibilityStyle.textContent = `
    .case-card.visible,
    .terminal-window.visible,
    .reveal-content.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;


document.head.appendChild(
    visibilityStyle
);