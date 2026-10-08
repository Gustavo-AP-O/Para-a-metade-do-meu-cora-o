/* =========================================================
   PERSONA 5 — JAVASCRIPT COMPLETO
   LUCIELE × MIGUEL
========================================================= */


/* =========================================================
   01. ELEMENTOS PRINCIPAIS
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

const screenFlash =
    document.getElementById(
        "screenFlash"
    );

const startHeistButton =
    document.getElementById(
        "startHeist"
    );

const operationSection =
    document.getElementById(
        "operation"
    );

const callingCard =
    document.getElementById(
        "callingCard"
    );

const gameArea =
    document.getElementById(
        "gameArea"
    );

const player =
    document.getElementById(
        "player"
    );

const memoryCount =
    document.getElementById(
        "memoryCount"
    );

const gameTimeElement =
    document.getElementById(
        "gameTime"
    );

const gameStatus =
    document.getElementById(
        "gameStatus"
    );

const gameOverlay =
    document.getElementById(
        "gameOverlay"
    );

const gameStart =
    document.getElementById(
        "gameStart"
    );

const gameExit =
    document.getElementById(
        "gameExit"
    );

const gameMessage =
    document.getElementById(
        "gameMessage"
    );

const gameMessageTitle =
    document.getElementById(
        "gameMessageTitle"
    );

const gameMessageText =
    document.getElementById(
        "gameMessageText"
    );

const gameMessageButton =
    document.getElementById(
        "gameMessageButton"
    );

const memoryItems =
    document.querySelectorAll(
        ".memory-item"
    );

const mobileButtons =
    document.querySelectorAll(
        ".mobile-controls button"
    );

const tiltElements =
    document.querySelectorAll(
        "[data-tilt]"
    );

const revealElements =
    document.querySelectorAll(
        ".plan-card, .calling-card, .calling-copy, .game-wrapper, .memory-wall, .letter-card"
    );

const finalSection =
    document.querySelector(
        ".final-section"
    );


/* =========================================================
   02. CONFIGURAÇÕES
========================================================= */

const GAME_START_TIME =
    15;


/*
    Velocidade do personagem.

    Se quiser mais rápido:
    3.0
    3.5
    4.0
*/

const PLAYER_SPEED =
    2.5;


/*
    Quantidade de corações
    na explosão final.
*/

const HEART_COUNT =
    28;


/*
    Quantidade de partículas
    vermelhas.
*/

const RED_PARTICLE_COUNT =
    42;


/*
    Quantidade de partículas
    brancas.
*/

const WHITE_PARTICLE_COUNT =
    22;


/*
    Quantidade de pequenos
    sparks.
*/

const SPARK_COUNT =
    30;


/*
    Quantidade de raios.
*/

const RAY_COUNT =
    22;


/* =========================================================
   03. ÁUDIO
========================================================= */

let musicPlaying =
    false;


/*
    Atualiza o botão da música.
*/

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


/*
    Tenta iniciar a música.
*/

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


/*
    Primeiro clique manual.
*/

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
    Primeira tentativa
    de autoplay.
*/

startMusic();


/*
    Caso o navegador bloqueie
    autoplay, tenta novamente
    na primeira interação.
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
                    O navegador continua
                    bloqueando o autoplay.
                */
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


/* =========================================================
   04. MENU MOBILE
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
   05. FLASH DA TELA
========================================================= */

function triggerFlash() {

    screenFlash.classList.remove(
        "active"
    );


    /*
        Força o navegador
        a reiniciar a animação.
    */

    void screenFlash.offsetWidth;


    screenFlash.classList.add(
        "active"
    );
}


/* =========================================================
   06. BOTÃO INICIAR OPERAÇÃO
========================================================= */

startHeistButton.addEventListener(
    "click",
    () => {

        triggerFlash();


        setTimeout(
            () => {

                operationSection.scrollIntoView({
                    behavior:
                        "smooth"
                });

            },
            190
        );
    }
);


/* =========================================================
   07. CALLING CARD
========================================================= */

callingCard.addEventListener(
    "click",
    () => {

        triggerFlash();


        callingCard.animate(
            [
                {
                    transform:
                        "rotate(-4deg) scale(1)"
                },

                {
                    transform:
                        "rotate(2deg) scale(1.06)"
                },

                {
                    transform:
                        "rotate(-1deg) scale(1)"
                }
            ],
            {
                duration:
                    620,

                easing:
                    "ease-out"
            }
        );
    }
);


/* =========================================================
   08. ESTADO DO JOGO
========================================================= */

const game = {

    running:
        false,

    finished:
        false,

    won:
        false,

    memories:
        0,

    time:
        GAME_START_TIME,

    x:
        8,

    y:
        84,

    speed:
        PLAYER_SPEED,

    keys:
        {},

    timer:
        null,

    animation:
        null

};


/* =========================================================
   09. POSIÇÃO INICIAL
========================================================= */

function resetPlayer() {

    game.x =
        8;

    game.y =
        84;

    updatePlayerPosition();
}


/* =========================================================
   10. POSIÇÃO DO PLAYER
========================================================= */

function updatePlayerPosition() {

    player.style.left =
        `${game.x}%`;

    player.style.top =
        `${game.y}%`;
}


/* =========================================================
   11. ATUALIZA HUD
========================================================= */

function updateHUD() {

    memoryCount.textContent =
        `${game.memories} / 3`;

    gameTimeElement.textContent =
        game.time;


    if (
        game.running
    ) {

        gameStatus.textContent =
            "ACTIVE";

    } else if (
        game.won
    ) {

        gameStatus.textContent =
            "CLEAR";

    } else if (
        game.finished
    ) {

        gameStatus.textContent =
            "FAILED";

    } else {

        gameStatus.textContent =
            "READY";
    }
}


/* =========================================================
   12. DISTÂNCIA ENTRE DOIS PONTOS
========================================================= */

function distanceBetween(
    x1,
    y1,
    x2,
    y2
) {

    const dx =
        x1 - x2;

    const dy =
        y1 - y2;


    return Math.sqrt(
        dx * dx +
        dy * dy
    );
}


/* =========================================================
   13. VERIFICAR MEMÓRIAS
========================================================= */

function checkMemoryCollisions() {

    memoryItems.forEach(
        (item) => {

            if (
                item.classList.contains(
                    "collected"
                )
            ) {

                return;
            }


            const targetX =
                parseFloat(
                    item.style
                        .getPropertyValue(
                            "--x"
                        )
                );


            const targetY =
                parseFloat(
                    item.style
                        .getPropertyValue(
                            "--y"
                        )
                );


            const distance =
                distanceBetween(
                    game.x,
                    game.y,
                    targetX,
                    targetY
                );


            if (
                distance <
                7
            ) {

                collectMemory(
                    item
                );
            }
        }
    );
}


/* =========================================================
   14. COLETAR MEMÓRIA
========================================================= */

function collectMemory(
    item
) {

    if (
        item.classList.contains(
            "collected"
        )
    ) {

        return;
    }


    item.classList.add(
        "collected"
    );


    game.memories++;


    triggerFlash();


    updateHUD();


    /*
        Pequena explosão
        individual.
    */

    item.animate(
        [
            {
                transform:
                    "translate(-50%, -50%) scale(1)"
            },

            {
                transform:
                    "translate(-50%, -50%) scale(2.7)"
            },

            {
                transform:
                    "translate(-50%, -50%) scale(0)"
            }
        ],
        {
            duration:
                420,

            easing:
                "ease-out"
        }
    );


    /*
        Quando todas as memórias
        são coletadas, libera a saída.
    */

    if (
        game.memories >= 3
    ) {

        gameStatus.textContent =
            "GO TO EXIT";
    }
}


/* =========================================================
   15. VERIFICAR EXIT
========================================================= */

function checkExit() {

    const exitX =
        92;

    const exitY =
        86;


    const distance =
        distanceBetween(
            game.x,
            game.y,
            exitX,
            exitY
        );


    if (
        distance <
        10 &&
        game.memories >= 3
    ) {

        winGame();
    }
}


/* =========================================================
   16. MOVIMENTO
========================================================= */

function movePlayer() {

    if (
        !game.running
    ) {

        return;
    }


    let dx =
        0;

    let dy =
        0;


    /*
        Esquerda.
    */

    if (
        game.keys[
            "ArrowLeft"
        ] ||
        game.keys[
            "a"
        ] ||
        game.keys[
            "A"
        ]
    ) {

        dx -= 1;
    }


    /*
        Direita.
    */

    if (
        game.keys[
            "ArrowRight"
        ] ||
        game.keys[
            "d"
        ] ||
        game.keys[
            "D"
        ]
    ) {

        dx += 1;
    }


    /*
        Cima.
    */

    if (
        game.keys[
            "ArrowUp"
        ] ||
        game.keys[
            "w"
        ] ||
        game.keys[
            "W"
        ]
    ) {

        dy -= 1;
    }


    /*
        Baixo.
    */

    if (
        game.keys[
            "ArrowDown"
        ] ||
        game.keys[
            "s"
        ] ||
        game.keys[
            "S"
        ]
    ) {

        dy += 1;
    }


    /*
        Normalização
        do movimento diagonal.
    */

    if (
        dx !== 0 &&
        dy !== 0
    ) {

        dx *=
            0.707;

        dy *=
            0.707;
    }


    /*
        Atualiza posição.
    */

    game.x +=
        dx *
        game.speed *
        0.11;


    game.y +=
        dy *
        game.speed *
        0.11;


    /*
        Limites do mapa.
    */

    game.x =
        Math.max(
            3,
            Math.min(
                97,
                game.x
            )
        );


    game.y =
        Math.max(
            6,
            Math.min(
                94,
                game.y
            )
        );


    updatePlayerPosition();


    checkMemoryCollisions();


    checkExit();


    game.animation =
        requestAnimationFrame(
            movePlayer
        );
}


/* =========================================================
   17. TECLADO
========================================================= */

window.addEventListener(
    "keydown",
    (event) => {

        game.keys[
            event.key
        ] =
            true;


        if (
            [
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
                " "
            ].includes(
                event.key
            )
        ) {

            event.preventDefault();
        }
    }
);


window.addEventListener(
    "keyup",
    (event) => {

        game.keys[
            event.key
        ] =
            false;
    }
);


/* =========================================================
   18. CONTROLES MOBILE
========================================================= */

mobileButtons.forEach(
    (button) => {

        const key =
            button.dataset.key;


        const pressStart =
            (event) => {

                event.preventDefault();

                game.keys[key] =
                    true;
            };


        const pressEnd =
            (event) => {

                event.preventDefault();

                game.keys[key] =
                    false;
            };


        button.addEventListener(
            "touchstart",
            pressStart,
            {
                passive: false
            }
        );


        button.addEventListener(
            "touchend",
            pressEnd,
            {
                passive: false
            }
        );


        button.addEventListener(
            "touchcancel",
            pressEnd,
            {
                passive: false
            }
        );


        button.addEventListener(
            "mousedown",
            pressStart
        );


        button.addEventListener(
            "mouseup",
            pressEnd
        );


        button.addEventListener(
            "mouseleave",
            pressEnd
        );
    }
);


/* =========================================================
   19. TIMER DO JOGO
========================================================= */

function startTimer() {

    clearInterval(
        game.timer
    );


    game.timer =
        setInterval(
            () => {

                if (
                    !game.running
                ) {

                    return;
                }


                game.time--;


                updateHUD();


                /*
                    Últimos segundos
                    ganham destaque.
                */

                if (
                    game.time <= 5 &&
                    game.time > 0
                ) {

                    gameTimeElement.animate(
                        [
                            {
                                transform:
                                    "scale(1)"
                            },

                            {
                                transform:
                                    "scale(1.35)"
                            },

                            {
                                transform:
                                    "scale(1)"
                            }
                        ],
                        {
                            duration:
                                350
                        }
                    );
                }


                /*
                    Acabou.
                */

                if (
                    game.time <= 0
                ) {

                    loseGame(
                        "TEMPO ESGOTADO",
                        "As memórias desapareceram antes do fim da operação."
                    );
                }

            },
            1000
        );
}


/* =========================================================
   20. INICIAR JOGO
========================================================= */

gameStart.addEventListener(
    "click",
    startGame
);


function startGame() {

    resetGame();


    game.running =
        true;


    game.finished =
        false;


    game.won =
        false;


    gameOverlay.classList.add(
        "hidden"
    );


    document.body.classList.add(
        "game-active"
    );


    updateHUD();


    startTimer();


    cancelAnimationFrame(
        game.animation
    );


    movePlayer();
}


/* =========================================================
   21. RESET DO JOGO
========================================================= */

function resetGame() {

    clearInterval(
        game.timer
    );


    cancelAnimationFrame(
        game.animation
    );


    game.running =
        false;


    game.finished =
        false;


    game.won =
        false;


    game.memories =
        0;


    /*
        AQUI ESTÁ O NOVO TEMPO:
        15 SEGUNDOS.
    */

    game.time =
        GAME_START_TIME;


    game.keys =
        {};


    resetPlayer();


    memoryItems.forEach(
        (item) => {

            item.classList.remove(
                "collected"
            );
        }
    );


    gameMessage.classList.remove(
        "show"
    );


    gameOverlay.classList.remove(
        "hidden"
    );


    document.body.classList.remove(
        "game-active"
    );


    updateHUD();
}


/* =========================================================
   22. VITÓRIA
========================================================= */

function winGame() {

    if (
        game.finished
    ) {

        return;
    }


    game.running =
        false;


    game.finished =
        true;


    game.won =
        true;


    clearInterval(
        game.timer
    );


    cancelAnimationFrame(
        game.animation
    );


    document.body.classList.remove(
        "game-active"
    );


    gameStatus.textContent =
        "CLEAR";


    /*
        ======================================
        A EXPLOSÃO COMEÇA AQUI
        ======================================
    */

    createVictoryExplosion();


    /*
        A mensagem aparece
        DEPOIS da explosão
        começar.
    */

    setTimeout(
        () => {

            showGameMessage(
                "OPERAÇÃO CONCLUÍDA",
                "Você encontrou todas as memórias. Agora pode seguir para a verdadeira recompensa.",
                "CONTINUAR"
            );

        },
        850
    );
}


/* =========================================================
   23. DERROTA
========================================================= */

function loseGame(
    title,
    text
) {

    if (
        game.finished
    ) {

        return;
    }


    game.running =
        false;


    game.finished =
        true;


    game.won =
        false;


    clearInterval(
        game.timer
    );


    cancelAnimationFrame(
        game.animation
    );


    document.body.classList.remove(
        "game-active"
    );


    gameStatus.textContent =
        "FAILED";


    showGameMessage(
        title,
        text,
        "TENTAR NOVAMENTE"
    );
}


/* =========================================================
   24. MENSAGEM DO JOGO
========================================================= */

function showGameMessage(
    title,
    text,
    buttonText
) {

    gameMessageTitle.textContent =
        title;


    gameMessageText.textContent =
        text;


    gameMessageButton.textContent =
        buttonText;


    gameMessage.classList.add(
        "show"
    );
}


/* =========================================================
   25. BOTÃO DA MENSAGEM
========================================================= */

gameMessageButton.addEventListener(
    "click",
    () => {

        /*
            Se venceu,
            vai para as memórias.
        */

        if (
            game.won
        ) {

            gameMessage.classList.remove(
                "show"
            );


            document
                .querySelector(
                    ".memory-wall-section"
                )
                .scrollIntoView({
                    behavior:
                        "smooth"
                });


            return;
        }


        /*
            Se perdeu,
            reinicia.
        */

        gameMessage.classList.remove(
            "show"
        );


        resetGame();
    }
);


/* =========================================================
   26. BOTÃO EXIT
========================================================= */

gameExit.addEventListener(
    "click",
    () => {

        if (
            !game.running
        ) {

            return;
        }


        if (
            game.memories <
            3
        ) {

            gameStatus.textContent =
                "3 MEMORIES NEEDED";


            gameExit.animate(
                [
                    {
                        transform:
                            "scale(1)"
                    },

                    {
                        transform:
                            "scale(1.12)"
                    },

                    {
                        transform:
                            "scale(1)"
                    }
                ],
                {
                    duration:
                        300
                }
            );


            return;
        }


        checkExit();
    }
);


/* =========================================================
   27. EXPLOSÃO FINAL — CONTAINER
========================================================= */

function createVictoryExplosion() {

    const explosion =
        document.createElement(
            "div"
        );


    explosion.className =
        "victory-explosion";


    gameArea.appendChild(
        explosion
    );


    /*
        Flash branco central.
    */

    const flash =
        document.createElement(
            "div"
        );


    flash.className =
        "victory-flash";


    explosion.appendChild(
        flash
    );


    /*
        Primeiro anel.
    */

    const ring =
        document.createElement(
            "div"
        );


    ring.className =
        "victory-ring";


    explosion.appendChild(
        ring
    );


    /*
        Segundo anel vermelho.
    */

    const redRing =
        document.createElement(
            "div"
        );


    redRing.className =
        "victory-ring red";


    explosion.appendChild(
        redRing
    );


    /*
        Raios.
    */

    for (
        let i = 0;
        i < RAY_COUNT;
        i++
    ) {

        createVictoryRay(
            explosion,
            i
        );
    }


    /*
        Partículas vermelhas.
    */

    for (
        let i = 0;
        i < RED_PARTICLE_COUNT;
        i++
    ) {

        createVictoryParticle(
            explosion,
            "red"
        );
    }


    /*
        Partículas brancas.
    */

    for (
        let i = 0;
        i < WHITE_PARTICLE_COUNT;
        i++
    ) {

        createVictoryParticle(
            explosion,
            "white"
        );
    }


    /*
        Corações ❤️
    */

    for (
        let i = 0;
        i < HEART_COUNT;
        i++
    ) {

        createHeartParticle(
            explosion,
            i
        );
    }


    /*
        Sparks.
    */

    for (
        let i = 0;
        i < SPARK_COUNT;
        i++
    ) {

        createSparkParticle(
            explosion
        );
    }


    /*
        Texto central.
    */

    setTimeout(
        () => {

            const word =
                document.createElement(
                    "div"
                );


            word.className =
                "victory-word";


            word.textContent =
                "OPERAÇÃO CONCLUÍDA";


            explosion.appendChild(
                word
            );

        },
        80
    );


    /*
        Tremida forte.
    */

    gameArea.classList.remove(
        "victory-shake"
    );


    void gameArea.offsetWidth;


    gameArea.classList.add(
        "victory-shake"
    );


    /*
        Flash vermelho
        na tela inteira.
    */

    document.body.classList.remove(
        "victory-screen-flash"
    );


    void document.body.offsetWidth;


    document.body.classList.add(
        "victory-screen-flash"
    );


    /*
        Pequeno impacto sonoro
        visual simulado pela animação.
    */

    gameArea.animate(
        [
            {
                filter:
                    "brightness(1)"
            },

            {
                filter:
                    "brightness(1.7)"
            },

            {
                filter:
                    "brightness(1)"
            }
        ],
        {
            duration:
                600,

            easing:
                "ease-out"
        }
    );


    /*
        Limpa tudo.
    */

    setTimeout(
        () => {

            explosion.remove();


            gameArea.classList.remove(
                "victory-shake"
            );


            document.body.classList.remove(
                "victory-screen-flash"
            );

        },
        1900
    );
}


/* =========================================================
   28. RAIO DA EXPLOSÃO
========================================================= */

function createVictoryRay(
    container,
    index
) {

    const ray =
        document.createElement(
            "div"
        );


    ray.className =
        "victory-ray";


    const angle =
        (
            360 /
            RAY_COUNT
        ) *
        index;


    const length =
        75 +
        Math.random() *
        165;


    const thickness =
        1 +
        Math.random() *
        3;


    const delay =
        Math.random() *
        0.06;


    ray.style.setProperty(
        "--angle",
        `${angle}deg`
    );


    ray.style.setProperty(
        "--length",
        `${length}px`
    );


    ray.style.setProperty(
        "--thickness",
        `${thickness}px`
    );


    ray.style.setProperty(
        "--delay",
        `${delay}s`
    );


    container.appendChild(
        ray
    );
}


/* =========================================================
   29. PARTÍCULAS VERMELHAS / BRANCAS
========================================================= */

function createVictoryParticle(
    container,
    type
) {

    const particle =
        document.createElement(
            "span"
        );


    particle.className =
        `victory-particle ${
            type === "red"
                ? "red-particle"
                : "white-particle"
        }`;


    const angle =
        Math.random() *
        Math.PI *
        2;


    const distance =
        75 +
        Math.random() *
        250;


    const dx =
        Math.cos(
            angle
        ) *
        distance;


    const dy =
        Math.sin(
            angle
        ) *
        distance;


    const size =
        type === "red"
            ? 4 +
              Math.random() *
              10

            : 2 +
              Math.random() *
              6;


    const duration =
        0.65 +
        Math.random() *
        0.7;


    const delay =
        Math.random() *
        0.12;


    const spin =
        -360 +
        Math.random() *
        720;


    particle.style.setProperty(
        "--dx",
        `${dx}px`
    );


    particle.style.setProperty(
        "--dy",
        `${dy}px`
    );


    particle.style.setProperty(
        "--size",
        `${size}px`
    );


    particle.style.setProperty(
        "--duration",
        `${duration}s`
    );


    particle.style.setProperty(
        "--delay",
        `${delay}s`
    );


    particle.style.setProperty(
        "--spin",
        `${spin}deg`
    );


    container.appendChild(
        particle
    );
}


/* =========================================================
   30. CORAÇÕES
========================================================= */

function createHeartParticle(
    container,
    index
) {

    const heart =
        document.createElement(
            "span"
        );


    heart.className =
        "victory-particle heart-particle";


    /*
        Alterna alguns símbolos
        para não ficar tudo igual.
    */

    if (
        index % 4 === 0
    ) {

        heart.textContent =
            "♥";

    } else if (
        index % 4 === 1
    ) {

        heart.textContent =
            "❤";

    } else if (
        index % 4 === 2
    ) {

        heart.textContent =
            "♥";

    } else {

        heart.textContent =
            "❤";
    }


    const angle =
        Math.random() *
        Math.PI *
        2;


    const distance =
        90 +
        Math.random() *
        300;


    const dx =
        Math.cos(
            angle
        ) *
        distance;


    const dy =
        Math.sin(
            angle
        ) *
        distance;


    const fontSize =
        13 +
        Math.random() *
        24;


    const duration =
        0.95 +
        Math.random() *
        0.65;


    const delay =
        0.05 +
        Math.random() *
        0.35;


    const spin =
        -35 +
        Math.random() *
        70;


    const startRotate =
        -20 +
        Math.random() *
        40;


    heart.style.setProperty(
        "--dx",
        `${dx}px`
    );


    heart.style.setProperty(
        "--dy",
        `${dy}px`
    );


    heart.style.setProperty(
        "--font-size",
        `${fontSize}px`
    );


    heart.style.setProperty(
        "--duration",
        `${duration}s`
    );


    heart.style.setProperty(
        "--delay",
        `${delay}s`
    );


    heart.style.setProperty(
        "--spin",
        `${spin}deg`
    );


    heart.style.setProperty(
        "--start-rotate",
        `${startRotate}deg`
    );


    container.appendChild(
        heart
    );
}


/* =========================================================
   31. SPARKS
========================================================= */

function createSparkParticle(
    container
) {

    const spark =
        document.createElement(
            "span"
        );


    spark.className =
        "victory-spark";


    const angle =
        Math.random() *
        Math.PI *
        2;


    const distance =
        60 +
        Math.random() *
        260;


    const dx =
        Math.cos(
            angle
        ) *
        distance;


    const dy =
        Math.sin(
            angle
        ) *
        distance;


    spark.style.setProperty(
        "--dx",
        `${dx}px`
    );


    spark.style.setProperty(
        "--dy",
        `${dy}px`
    );


    spark.style.animationDelay =
        `${Math.random() * 0.15}s`;


    container.appendChild(
        spark
    );
}


/* =========================================================
   32. TILT DAS FOTOS
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


                    const px =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width;


                    const py =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height;


                    const rotateY =
                        (
                            px -
                            0.5
                        ) *
                        8;


                    const rotateX =
                        (
                            py -
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

                    if (
                        element.classList.contains(
                            "main-photo"
                        )
                    ) {

                        element.style.transform =
                            "rotate(-6deg)";

                    } else {

                        element.style.transform =
                            "rotate(7deg)";
                    }
                }
            );
        }
    );
}


/* =========================================================
   33. ANIMAÇÕES AO ROLAR
========================================================= */

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
   34. CSS DINÂMICO DAS ANIMAÇÕES
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
   35. FINAL DA PÁGINA
========================================================= */

let finalTriggered =
    false;


const finalObserver =
    new IntersectionObserver(
        (entries) => {

            if (
                finalTriggered
            ) {

                return;
            }


            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        finalTriggered =
                            true;


                        setTimeout(
                            () => {

                                triggerFlash();

                            },
                            150
                        );
                    }
                }
            );

        },
        {
            threshold:
                0.45
        }
    );


if (
    finalSection
) {

    finalObserver.observe(
        finalSection
    );
}


/* =========================================================
   36. INICIALIZAÇÃO FINAL
========================================================= */

resetPlayer();

updateHUD();