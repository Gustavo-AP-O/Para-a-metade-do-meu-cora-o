/* =========================================================
   PERSONA 2 — JAVASCRIPT
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


const enterButton =
    document.getElementById(
        "enterButton"
    );


const dualitySection =
    document.getElementById(
        "duality"
    );


const perspectiveCards =
    document.querySelectorAll(
        ".perspective-card"
    );


const perspectiveButtons =
    document.querySelectorAll(
        ".perspective-button"
    );


const perspectiveResult =
    document.getElementById(
        "perspectiveResult"
    );


const perspectiveModal =
    document.getElementById(
        "perspectiveModal"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const perspectiveTitle =
    document.getElementById(
        "perspectiveTitle"
    );


const perspectiveText =
    document.getElementById(
        "perspectiveText"
    );


const rumorNodes =
    document.querySelectorAll(
        ".rumor-node"
    );


const rumorTitle =
    document.getElementById(
        "rumorTitle"
    );


const rumorText =
    document.getElementById(
        "rumorText"
    );


const confidenceValue =
    document.getElementById(
        "confidenceValue"
    );


const confidenceBar =
    document.getElementById(
        "confidenceBar"
    );


const rumorStatus =
    document.getElementById(
        "rumorStatus"
    );


const meterProgress =
    document.getElementById(
        "meterProgress"
    );


const meterNumber =
    document.getElementById(
        "meterNumber"
    );


const truthButton =
    document.getElementById(
        "truthButton"
    );


const truthReveal =
    document.getElementById(
        "truthReveal"
    );


const revealElements =
    document.querySelectorAll(
        ".perspective-card, .rumor-board, .rumor-detail, .message-terminal, .perception-copy, .perception-meter, .truth-content"
    );


/* =========================================================
   02. ESTADO
========================================================= */

let musicPlaying =
    false;


let selectedRumors =
    0;


let perception =
    0;


let selectedRumorId =
    null;


/* =========================================================
   03. DADOS DAS PERSPECTIVAS
========================================================= */

const perspectiveData = {

    luciele: {

        title:
            "PERSPECTIVA DA LUCIELE",

        text:
            "Talvez, para ela, vários momentos tenham um significado diferente. Algumas coisas podem ter parecido pequenas no instante em que aconteceram e enormes quando foram lembradas depois. Essa é a beleza de uma memória: ela muda com quem a carrega."

    },


    miguel: {

        title:
            "PERSPECTIVA DO MIGUEL",

        text:
            "Do outro lado, a mesma história pode ter sido percebida de outra maneira. Um detalhe que parecia completamente comum pode ter ficado guardado por muito mais tempo do que alguém imaginaria."

    }

};


/* =========================================================
   04. DADOS DOS RUMORES
========================================================= */

const rumorData = {

    1: {

        title:
            "ELA JÁ SABIA.",

        text:
            "Talvez ela tenha percebido antes que aquilo estava se tornando importante. Não necessariamente porque sabia o futuro, mas porque algumas coisas começam a fazer sentido antes mesmo de serem ditas.",

        confidence:
            72,

        status:
            "PROVÁVEL"

    },


    2: {

        title:
            "FOI SÓ COINCIDÊNCIA.",

        text:
            "Existe sempre uma explicação simples para quase tudo. Mas algumas coincidências acabam acontecendo tantas vezes que começam a parecer pistas.",

        confidence:
            41,

        status:
            "DUVIDOSO"

    },


    3: {

        title:
            "ALGUÉM MENTIU.",

        text:
            "Talvez ninguém tenha mentido de verdade. Talvez algumas coisas tenham simplesmente sido interpretadas de maneiras diferentes. Entre intenção e percepção existe um espaço enorme.",

        confidence:
            63,

        status:
            "INCONCLUSIVO"

    },


    4: {

        title:
            "FOI PLANEJADO.",

        text:
            "Essa é a teoria mais perigosa. Talvez certas coisas realmente tenham sido planejadas. Ou talvez seja apenas muito bonito acreditar que alguns encontros tinham que acontecer.",

        confidence:
            89,

        status:
            "ALTAMENTE PROVÁVEL"

    }

};


/* =========================================================
   05. MUSIC
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
    Retry depois da primeira
    interação do usuário.
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
                    Navegador ainda bloqueando.
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
   06. MENU MOBILE
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
   07. BOTÃO ENTRAR NO ARQUIVO
========================================================= */

enterButton.addEventListener(
    "click",
    () => {

        dualitySection.scrollIntoView({
            behavior:
                "smooth"
        });
    }
);


/* =========================================================
   08. MODAL DE PERSPECTIVA
========================================================= */

function openPerspective(
    perspective
) {

    const data =
        perspectiveData[
            perspective
        ];


    if (
        !data
    ) {

        return;
    }


    perspectiveTitle.textContent =
        data.title;


    perspectiveText.textContent =
        data.text;


    perspectiveModal.classList.add(
        "open"
    );


    perspectiveModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";
}


function closePerspective() {

    perspectiveModal.classList.remove(
        "open"
    );


    perspectiveModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


perspectiveButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".perspective-card"
                    );


                const perspective =
                    card.dataset.perspective;


                openPerspective(
                    perspective
                );


                card.classList.add(
                    "opened"
                );


                /*
                    Quando pelo menos
                    uma perspectiva foi aberta,
                    aparece o resultado.
                */

                perspectiveResult.classList.add(
                    "show"
                );
            }
        );

    }
);


modalClose.addEventListener(
    "click",
    closePerspective
);


document
    .querySelector(
        ".modal-backdrop"
    )
    .addEventListener(
        "click",
        closePerspective
    );


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            "Escape"
        ) {

            closePerspective();
        }

    }
);


/* =========================================================
   09. RUMOR BOARD
========================================================= */

rumorNodes.forEach(
    (node) => {

        node.addEventListener(
            "click",
            () => {

                const rumorId =
                    node.dataset.rumor;


                selectRumor(
                    rumorId
                );
            }
        );

    }
);


/* =========================================================
   10. SELECIONAR RUMOR
========================================================= */

function selectRumor(
    rumorId
) {

    const data =
        rumorData[
            rumorId
        ];


    if (
        !data
    ) {

        return;
    }


    /*
        Remove seleção anterior.
    */

    rumorNodes.forEach(
        (node) => {

            node.classList.remove(
                "active"
            );

        }
    );


    /*
        Seleciona o atual.
    */

    const selected =
        document.querySelector(
            `.rumor-node[data-rumor="${rumorId}"]`
        );


    if (
        selected
    ) {

        selected.classList.add(
            "active"
        );
    }


    /*
        Atualiza painel.
    */

    rumorTitle.textContent =
        data.title;


    rumorText.textContent =
        data.text;


    confidenceValue.textContent =
        `${data.confidence}%`;


    confidenceBar.style.width =
        `${data.confidence}%`;


    rumorStatus.textContent =
        data.status;


    /*
        Conta rumor novo.
    */

    if (
        selectedRumorId !==
        rumorId
    ) {

        selectedRumors++;


        selectedRumorId =
            rumorId;


        updatePerception();
    }


    /*
        Animação do painel.
    */

    const detail =
        document.querySelector(
            ".rumor-detail"
        );


    detail.animate(
        [
            {
                opacity:
                    0.4,

                transform:
                    "translateX(7px)"
            },

            {
                opacity:
                    1,

                transform:
                    "translateX(0)"
            }
        ],
        {
            duration:
                320,

            easing:
                "ease-out"
        }
    );
}


/* =========================================================
   11. PERCEPÇÃO
========================================================= */

function updatePerception() {

    /*
        Cada rumor aumenta
        a percepção.

        O valor máximo é 100.
    */

    const base =
        selectedRumors *
        18;


    const extra =
        selectedRumors === 4
            ? 28
            : 0;


    perception =
        Math.min(
            100,
            base + extra
        );


    /*
        Número central.
    */

    meterNumber.textContent =
        String(
            perception
        ).padStart(
            2,
            "0"
        );


    /*
        Graus do círculo.

        0% = 0 graus
        100% = 360 graus
    */

    const degrees =
        (
            perception /
            100
        ) *
        360;


    meterProgress.style.background =
        `
        conic-gradient(
            from -90deg,
            var(--blue) 0deg,
            var(--orange) ${degrees}deg,
            transparent ${degrees}deg
        )
        `;


    /*
        Último nível.
    */

    if (
        perception >=
        100
    ) {

        meterNumber.animate(
            [
                {
                    transform:
                        "scale(1)"
                },

                {
                    transform:
                        "scale(1.18)"
                },

                {
                    transform:
                        "scale(1)"
                }
            ],
            {
                duration:
                    500
            }
        );
    }
}


/* =========================================================
   12. VERDADE FINAL
========================================================= */

truthButton.addEventListener(
    "click",
    () => {

        truthReveal.classList.add(
            "show"
        );


        truthButton.textContent =
            "ARQUIVO DESBLOQUEADO";


        truthReveal.animate(
            [
                {
                    opacity:
                        0,

                    transform:
                        "translateY(15px) scale(0.98)"
                },

                {
                    opacity:
                        1,

                    transform:
                        "translateY(-3px) scale(1.015)"
                },

                {
                    opacity:
                        1,

                    transform:
                        "translateY(0) scale(1)"
                }
            ],
            {
                duration:
                    550,

                easing:
                    "ease-out"
            }
        );
    }
);


/* =========================================================
   13. ANIMAÇÃO DE APARECER AO SCROLL
========================================================= */

revealElements.forEach(
    (element) => {

        element.classList.add(
            "scroll-hidden"
        );
    }
);


const observer =
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


                        observer.unobserve(
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

        observer.observe(
            element
        );
    }
);


/* =========================================================
   14. CSS DE SCROLL
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
   15. MOVIMENTO SUTIL DO HERO
========================================================= */

const heroCopy =
    document.querySelector(
        ".hero-copy"
    );


const dualityVisual =
    document.querySelector(
        ".duality-visual"
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

            const x =
                (
                    event.clientX /
                    window.innerWidth
                ) -
                0.5;


            const y =
                (
                    event.clientY /
                    window.innerHeight
                ) -
                0.5;


            heroCopy.style.transform =
                `
                translate(
                    ${x * 3}px,
                    ${y * 3}px
                )
                `;


            dualityVisual.style.transform =
                `
                translate(
                    ${x * -5}px,
                    ${y * -4}px
                )
                `;

        }
    );

}


/* =========================================================
   16. EFEITO NO CENTRO DO BOARD
========================================================= */

const boardCenter =
    document.querySelector(
        ".board-center"
    );


setInterval(
    () => {

        boardCenter.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(1)"
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1.06)"
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)"
                }
            ],
            {
                duration:
                    900,

                easing:
                    "ease-in-out"
            }
        );

    },
    2600
);


/* =========================================================
   17. EFEITO DAS CONEXÕES
========================================================= */

const connections =
    document.querySelectorAll(
        ".connection"
    );


connections.forEach(
    (
        connection,
        index
    ) => {

        connection.style.opacity =
            "0.15";


        setInterval(
            () => {

                connection.animate(
                    [
                        {
                            opacity:
                                0.12
                        },

                        {
                            opacity:
                                0.7
                        },

                        {
                            opacity:
                                0.12
                        }
                    ],
                    {
                        duration:
                            1200,

                        delay:
                            index * 220
                    }
                );

            },
            3100
        );

    }
);


/* =========================================================
   18. CLICK EXTRA NO BOARD
========================================================= */

const rumorBoard =
    document.querySelector(
        ".rumor-board"
    );


rumorBoard.addEventListener(
    "dblclick",
    () => {

        rumorBoard.animate(
            [
                {
                    transform:
                        "translateX(0)"
                },

                {
                    transform:
                        "translateX(-5px)"
                },

                {
                    transform:
                        "translateX(5px)"
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
   19. INICIALIZAÇÃO
========================================================= */

updatePerception();

/* =========================================================
   MEMORY DUEL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const memoryRange = document.getElementById("memoryRange");
    const memoryPercent = document.getElementById("memoryPercent");
    const memoryStatus = document.getElementById("memoryStatus");
    const memoryStage = document.querySelector(".memory-duel-stage");

    const titleA = document.getElementById("memoryTitleA");
    const textA = document.getElementById("memoryTextA");
    const noteA = document.getElementById("memoryNoteA");

    const titleB = document.getElementById("memoryTitleB");
    const textB = document.getElementById("memoryTextB");
    const noteB = document.getElementById("memoryNoteB");

    const memoryTabs = document.querySelectorAll(".memory-tab");

    if (!memoryRange) {
        return;
    }


    /*
     * Cada objeto representa uma memória.
     * Você pode editar os textos diretamente aqui.
     */

    const memories = [

        {
            titleA: "O começo de tudo",

            textA:
                "Algumas histórias começam sem ninguém perceber " +
                "que estão prestes a se tornar importantes.",

            noteA:
                "Eu não sabia que aquilo ia significar tanto.",

            titleB:
                "O começo de tudo",

            textB:
                "Talvez, daquele outro lado, " +
                "tudo tenha parecido muito mais simples.",

            noteB:
                "Parecia só mais um momento."
        },


        {
            titleA: "Aquela conversa",

            textA:
                "Tem conversas que terminam, mas continuam " +
                "ecoando na cabeça por muito mais tempo.",

            noteA:
                "Eu lembro mais do que demonstrei.",

            titleB:
                "Aquela conversa",

            textB:
                "Às vezes uma conversa parece completamente normal " +
                "até você perceber o quanto ela ficou na memória.",

            noteB:
                "Eu nem imaginava que seria importante."
        },


        {
            titleA: "Um momento",

            textA:
                "Talvez tenha sido só mais um momento para quem olhava " +
                "de fora. Para mim, não foi.",

            noteA:
                "Eu teria guardado esse instante de qualquer jeito.",

            titleB:
                "Um momento",

            textB:
                "Nem sempre percebemos que estamos vivendo uma lembrança " +
                "enquanto ela ainda está acontecendo.",

            noteB:
                "Só fui entender depois."
        },


        {
            titleA: "Hoje",

            textA:
                "Depois de tudo, algumas memórias parecem pequenas. " +
                "Mas foram elas que construíram o caminho até aqui.",

            noteA:
                "E eu ainda escolheria viver tudo outra vez.",

            titleB:
                "Hoje",

            textB:
                "Quando você olha para trás, percebe que não foi uma coisa só. " +
                "Foram dezenas de pequenos momentos.",

            noteB:
                "Talvez essa seja a parte mais bonita."
        }

    ];


    let currentMemory = 0;


    function updateRangeVisual() {

        const value = Number(memoryRange.value);

        memoryPercent.textContent = `${value}%`;

        memoryRange.style.setProperty(
            "--value",
            `${value}%`
        );


        /*
         * Atualiza a sensação visual dos dois lados.
         */

        const leftInfluence = Math.max(value, 10);
        const rightInfluence = Math.max(100 - value, 10);

        const sideA = document.querySelector(".side-a");
        const sideB = document.querySelector(".side-b");

        if (sideA) {
            sideA.style.opacity =
                `${0.6 + leftInfluence / 250}`;
        }

        if (sideB) {
            sideB.style.opacity =
                `${0.6 + rightInfluence / 250}`;
        }


        if (value <= 15) {

            memoryStatus.textContent =
                "FOCO TOTAL // LADO LUCIELE";

        } else if (value >= 85) {

            memoryStatus.textContent =
                "FOCO TOTAL // LADO MIGUEL";

        } else {

            memoryStatus.textContent =
                "CONEXÃO ESTÁVEL // DOIS LADOS DETECTADOS";
        }


        if (memoryStage) {

            memoryStage.style.setProperty(
                "--split-position",
                `${value}%`
            );

        }

    }


    function triggerGlitch() {

        if (!memoryStage) {
            return;
        }

        memoryStage.classList.remove("glitching");

        void memoryStage.offsetWidth;

        memoryStage.classList.add("glitching");

        setTimeout(() => {

            memoryStage.classList.remove("glitching");

        }, 220);
    }


    function loadMemory(index) {

        const memory = memories[index];

        if (!memory) {
            return;
        }

        currentMemory = index;


        titleA.textContent = memory.titleA;

        textA.textContent = memory.textA;

        noteA.textContent = `“${memory.noteA}”`;


        titleB.textContent = memory.titleB;

        textB.textContent = memory.textB;

        noteB.textContent = `“${memory.noteB}”`;


        memoryTabs.forEach((tab, tabIndex) => {

            tab.classList.toggle(
                "active",
                tabIndex === index
            );

        });


        triggerGlitch();

        memoryRange.value = 50;

        updateRangeVisual();

    }


    memoryRange.addEventListener(
        "input",
        updateRangeVisual
    );


    memoryTabs.forEach((tab, index) => {

        tab.addEventListener("click", () => {

            loadMemory(index);

        });

    });


    /*
     * Teclas de seta também funcionam.
     */

    memoryRange.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "ArrowLeft") {

                event.preventDefault();

                memoryRange.value =
                    Math.max(
                        Number(memoryRange.value) - 5,
                        0
                    );

                updateRangeVisual();
            }


            if (event.key === "ArrowRight") {

                event.preventDefault();

                memoryRange.value =
                    Math.min(
                        Number(memoryRange.value) + 5,
                        100
                    );

                updateRangeVisual();
            }

        }
    );


    /*
     * Inicialização
     */

    loadMemory(currentMemory);

});