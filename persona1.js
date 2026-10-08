/* =========================================================
   PERSONA 1 — JAVASCRIPT
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


const bootButton =
    document.getElementById(
        "bootButton"
    );


const archiveSection =
    document.getElementById(
        "archive"
    );


const bootStatus =
    document.getElementById(
        "bootStatus"
    );


const heroTerminal =
    document.getElementById(
        "heroTerminal"
    );


const commandButtons =
    document.querySelectorAll(
        ".command"
    );


const terminalOutput =
    document.getElementById(
        "terminalOutput"
    );


const terminalInput =
    document.getElementById(
        "terminalInput"
    );


const tarotCards =
    document.querySelectorAll(
        ".tarot-card"
    );


const tarotTitle =
    document.getElementById(
        "tarotTitle"
    );


const tarotText =
    document.getElementById(
        "tarotText"
    );


const tarotProgress =
    document.getElementById(
        "tarotProgress"
    );


const tarotStatus =
    document.getElementById(
        "tarotStatus"
    );


const tarotResult =
    document.getElementById(
        "tarotResult"
    );


const tarotModal =
    document.getElementById(
        "tarotModal"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalCardNumber =
    document.getElementById(
        "modalCardNumber"
    );


const modalCardTitle =
    document.getElementById(
        "modalCardTitle"
    );


const modalCardText =
    document.getElementById(
        "modalCardText"
    );


const decodeButton =
    document.getElementById(
        "decodeButton"
    );


const decodedMessage =
    document.getElementById(
        "decodedMessage"
    );


const revealElements =
    document.querySelectorAll(
        ".main-terminal, .tarot-card, .tarot-result, .code-copy, .code-panel, .final-content"
    );


/* =========================================================
   02. ESTADO
========================================================= */

let musicPlaying =
    false;


let selectedCards =
    0;


let cardsSelected =
    new Set();


let terminalStarted =
    false;


let typingAnimationRunning =
    false;


/* =========================================================
   03. DADOS TAROT
========================================================= */

const tarotData = {

    one: {

        number:
            "I",

        title:
            "O COMEÇO",

        shortTitle:
            "THE BEGINNING",

        text:
            "Toda história precisa de um primeiro momento. Esta carta representa aquele instante em que alguma coisa começou sem que vocês soubessem exatamente o tamanho que aquilo teria.",

        progress:
            33,

        color:
            "green"
    },


    two: {

        number:
            "II",

        title:
            "A CONEXÃO",

        shortTitle:
            "THE CONNECTION",

        text:
            "Nem todo vínculo acontece de uma vez. Ele aparece aos poucos: em conversas, pequenas lembranças e momentos que começam a significar mais do que deveriam.",

        progress:
            66,

        color:
            "orange"
    },


    three: {

        number:
            "III",

        title:
            "O QUE VEM",

        shortTitle:
            "THE FUTURE",

        text:
            "A terceira carta não representa um destino fixo. Ela representa possibilidade. Ainda existem capítulos que ninguém escreveu, e talvez essa seja justamente a melhor parte.",

        progress:
            100,

        color:
            "purple"
    }

};


/* =========================================================
   04. MÚSICA
========================================================= */

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
    Segunda chance depois
    da primeira interação.
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
                    Navegador bloqueou.
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
   05. MENU MOBILE
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
   06. CURSOR CUSTOMIZADO
========================================================= */

const customCursor =
    document.querySelector(
        ".system-cursor"
    );


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    window.addEventListener(
        "mousemove",
        (
            event
        ) => {

            customCursor.style.transform =
                `
                translate(
                    ${event.clientX}px,
                    ${event.clientY}px
                )
                `;

        }
    );

}


/* =========================================================
   07. BOOT SCREEN
========================================================= */

const heroLines =
    heroTerminal.querySelectorAll(
        ".terminal-line"
    );


function typeHeroLine(
    element,
    text,
    delay
) {

    setTimeout(
        () => {

            let index =
                0;


            const interval =
                setInterval(
                    () => {

                        element.textContent =
                            text.slice(
                                0,
                                index
                            );

                        index++;


                        if (
                            index >
                            text.length
                        ) {

                            clearInterval(
                                interval
                            );
                        }

                    },
                    21
                );

        },
        delay
    );
}


/*
    Limpa o texto inicial
    e recria a animação.
*/

function animateHeroTerminal() {

    if (
        typingAnimationRunning
    ) {

        return;
    }


    typingAnimationRunning =
        true;


    heroLines.forEach(
        (
            line
        ) => {

            line.textContent =
                "";
        }
    );


    heroLines.forEach(
        (
            line,
            index
        ) => {

            typeHeroLine(
                line,
                line.dataset.text,
                index * 650
            );
        }
    );


    setTimeout(
        () => {

            typingAnimationRunning =
                false;

        },
        3500
    );
}


animateHeroTerminal();


setInterval(
    animateHeroTerminal,
    10000
);


/* =========================================================
   08. INICIAR ARQUIVO
========================================================= */

bootButton.addEventListener(
    "click",
    () => {

        bootStatus.textContent =
            "LOADING";


        bootButton.animate(
            [
                {
                    transform:
                        "translateY(0)"
                },

                {
                    transform:
                        "translateY(-4px)"
                },

                {
                    transform:
                        "translateY(0)"
                }
            ],
            {
                duration:
                    350
            }
        );


        setTimeout(
            () => {

                bootStatus.textContent =
                    "CONNECTED";


                archiveSection.scrollIntoView({
                    behavior:
                        "smooth"
                });


                setTimeout(
                    () => {

                        terminalInput.focus();

                    },
                    750
                );

            },
            450
        );
    }
);


/* =========================================================
   09. TERMINAL DATA
========================================================= */

const terminalCommands = {

    help: [

        {
            text:
                "> available commands:",
            type:
                "system"
        },

        {
            text:
                "  status",
            type:
                "normal"
        },

        {
            text:
                "  identity",
            type:
                "normal"
        },

        {
            text:
                "  date",
            type:
                "normal"
        },

        {
            text:
                "  secret",
            type:
                "normal"
        },

        {
            text:
                "  love",
            type:
                "accent"
        }

    ],


    status: [

        {
            text:
                "> system status: ONLINE",
            type:
                "system"
        },

        {
            text:
                "> archive status: ACTIVE",
            type:
                "normal"
        },

        {
            text:
                "> memory integrity: 100%",
            type:
                "normal"
        },

        {
            text:
                "> identities: 02",
            type:
                "normal"
        },

        {
            text:
                "> connection: STABLE",
            type:
                "accent"
        }

    ],


    identity: [

        {
            text:
                "> identity_01: LUCIELE",
            type:
                "system"
        },

        {
            text:
                "> identity_02: MIGUEL",
            type:
                "system"
        },

        {
            text:
                "> status: TOGETHER",
            type:
                "accent"
        },

        {
            text:
                "> compatibility: CLASSIFIED",
            type:
                "warning"
        }

    ],


    date: [

        {
            text:
                "> first registered date:",
            type:
                "system"
        },

        {
            text:
                "  23 / 07 / 2025",
            type:
                "normal"
        },

        {
            text:
                "> initial timestamp:",
            type:
                "system"
        },

        {
            text:
                "  09 : 00",
            type:
                "normal"
        },

        {
            text:
                "> archive created successfully.",
            type:
                "accent"
        }

    ],


    secret: [

        {
            text:
                "> WARNING: restricted file.",
            type:
                "warning"
        },

        {
            text:
                "> authentication bypassed.",
            type:
                "system"
        },

        {
            text:
                "> hidden message found.",
            type:
                "accent"
        },

        {
            text:
                "> " +
                "some stories are impossible to explain from the outside.",
            type:
                "normal"
        },

        {
            text:
                "> only the people inside know what really happened.",
            type:
                "green"
        }

    ],


    love: [

        {
            text:
                "> searching...",
            type:
                "system"
        },

        {
            text:
                "> searching deeper...",
            type:
                "system"
        },

        {
            text:
                "> result found.",
            type:
                "accent"
        },

        {
            text:
                "  LUCIELE + MIGUEL",
            type:
                "green"
        },

        {
            text:
                "> no further explanation required.",
            type:
                "normal"
        }

    ]

};


/* =========================================================
   10. ESCREVER TERMINAL
========================================================= */

function printLine(
    text,
    type = "normal"
) {

    const line =
        document.createElement(
            "div"
        );


    line.className =
        `output-line ${type}`;


    line.textContent =
        text;


    terminalOutput.appendChild(
        line
    );


    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;
}


function runCommand(
    command
) {

    const clean =
        command
            .trim()
            .toLowerCase();


    if (
        !clean
    ) {

        return;
    }


    printLine(
        `> ${clean}`,
        "system"
    );


    if (
        terminalCommands[
            clean
        ]
    ) {

        terminalCommands[
            clean
        ].forEach(
            (
                item
            ) => {

                setTimeout(
                    () => {

                        printLine(
                            item.text,
                            item.type
                        );

                    },
                    100
                );

            }
        );

    } else {

        printLine(
            "> command not found.",
            "warning"
        );

        printLine(
            "> try: help",
            "normal"
        );
    }
}


/* =========================================================
   11. INPUT TERMINAL
========================================================= */

terminalInput.addEventListener(
    "keydown",
    (
        event
    ) => {

        if (
            event.key ===
            "Enter"
        ) {

            const value =
                terminalInput.value;


            terminalInput.value =
                "";


            runCommand(
                value
            );
        }

    }
);


/* =========================================================
   12. COMANDOS LATERAIS
========================================================= */

commandButtons.forEach(
    (
        button
    ) => {

        button.addEventListener(
            "click",
            () => {

                commandButtons.forEach(
                    (
                        other
                    ) => {

                        other.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const command =
                    button.dataset.command;


                runCommand(
                    command
                );

            }
        );

    }
);


/* =========================================================
   13. TAROT
========================================================= */

function updateTarotResult(
    card
) {

    const data =
        tarotData[
            card
        ];


    if (
        !data
    ) {

        return;
    }


    tarotTitle.textContent =
        data.title;


    tarotText.textContent =
        data.text;


    tarotProgress.style.width =
        `${data.progress}%`;


    tarotStatus.textContent =
        `CARD ${data.number} // ${data.shortTitle}`;


    tarotResult.animate(
        [
            {
                opacity:
                    0.35,

                transform:
                    "translateY(8px)"
            },

            {
                opacity:
                    1,

                transform:
                    "translateY(0)"
            }
        ],
        {
            duration:
                400,

            easing:
                "ease-out"
        }
    );
}


/* =========================================================
   14. ABRIR MODAL TAROT
========================================================= */

function openTarotModal(
    card
) {

    const data =
        tarotData[
            card
        ];


    modalCardNumber.textContent =
        data.number;


    modalCardTitle.textContent =
        data.title;


    modalCardText.textContent =
        data.text;


    tarotModal.classList.add(
        "open"
    );


    tarotModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";
}


/* =========================================================
   15. FECHAR MODAL TAROT
========================================================= */

function closeTarotModal() {

    tarotModal.classList.remove(
        "open"
    );


    tarotModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


modalClose.addEventListener(
    "click",
    closeTarotModal
);


document
    .querySelector(
        ".modal-backdrop"
    )
    .addEventListener(
        "click",
        closeTarotModal
);


document.addEventListener(
    "keydown",
    (
        event
    ) => {

        if (
            event.key ===
            "Escape"
        ) {

            closeTarotModal();
        }
    }
);


/* =========================================================
   16. CLIQUE NAS CARTAS
========================================================= */

tarotCards.forEach(
    (
        cardElement
    ) => {

        cardElement.addEventListener(
            "click",
            () => {

                const card =
                    cardElement.dataset.card;


                /*
                    Vira a carta.
                */

                cardElement.classList.toggle(
                    "flipped"
                );


                /*
                    Se foi virada
                    pela primeira vez.
                */

                if (
                    cardElement.classList.contains(
                        "flipped"
                    ) &&
                    !cardsSelected.has(
                        card
                    )
                ) {

                    cardsSelected.add(
                        card
                    );


                    selectedCards++;


                    updateTarotResult(
                        card
                    );


                    /*
                        Depois de pequena pausa,
                        abre a mensagem.
                    */

                    setTimeout(
                        () => {

                            openTarotModal(
                                card
                            );

                        },
                        430
                    );

                }

            }
        );

    }
);


/* =========================================================
   17. DECODIFICAR CÓDIGO
========================================================= */

decodeButton.addEventListener(
    "click",
    () => {

        const messages = [

            "DECODING...",
            "DATE FOUND.",
            "TIME FOUND.",
            "MEMORY MATCH CONFIRMED.",
            "23 / 07 / 2025 // 09:00",
            "THE STORY STARTED HERE."
        ];


        decodedMessage.classList.remove(
            "unlocked"
        );


        decodedMessage.textContent =
            "";


        messages.forEach(
            (
               message,
                index
            ) => {

                setTimeout(
                    () => {

                        decodedMessage.textContent =
                            message;

                    },
                    index * 550
                );

            }
        );


        setTimeout(
            () => {

                decodedMessage.classList.add(
                    "unlocked"
                );

                decodedMessage.textContent =
                    "FILE UNLOCKED // 23.07.2025 // 09:00 // THE FIRST MOMENT.";

            },
            messages.length * 550
        );

    }
);


/* =========================================================
   18. APARECER AO ROLAR
========================================================= */

revealElements.forEach(
    (
        element
    ) => {

        element.classList.add(
            "scroll-hidden"
        );
    }
);


const revealObserver =
    new IntersectionObserver(
        (
            entries
        ) => {

            entries.forEach(
                (
                    entry
                ) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "scroll-visible"
                        );


                        revealObserver.unobserve(
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
    (
        element
    ) => {

        revealObserver.observe(
            element
        );
    }
);


/* =========================================================
   19. CSS SCROLL
========================================================= */

const scrollStyle =
    document.createElement(
        "style"
    );


scrollStyle.textContent = `

    .scroll-hidden {
        opacity: 0;

        transform:
            translateY(30px);

        transition:
            opacity 0.72s ease,
            transform 0.72s ease;
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
   20. EFEITO DE TERMINAL AO FOCAR
========================================================= */

terminalInput.addEventListener(
    "focus",
    () => {

        terminalInput.parentElement.animate(
            [
                {
                    opacity:
                        0.55
                },

                {
                    opacity:
                        1
                }
            ],
            {
                duration:
                    250
            }
        );

    }
);


/* =========================================================
   21. EFEITO DO TERMINAL PRINCIPAL
========================================================= */

const mainTerminal =
    document.querySelector(
        ".main-terminal"
    );


mainTerminal.addEventListener(
    "dblclick",
    () => {

        mainTerminal.animate(
            [
                {
                    transform:
                        "translateX(0)"
                },

                {
                    transform:
                        "translateX(-4px)"
                },

                {
                    transform:
                        "translateX(4px)"
                },

                {
                    transform:
                        "translateX(0)"
                }
            ],
            {
                duration:
                    260
            }
        );

    }
);


/* =========================================================
   22. TERMINAL BOOT AUTOMÁTICO
========================================================= */

setTimeout(
    () => {

        if (
            terminalOutput.children.length ===
            0
        ) {

            runCommand(
                "status"
            );

        }

    },
    800
);


/* =========================================================
   23. INICIALIZAÇÃO
========================================================= */

updateTarotResult(
    "one"
);