"use strict";

$(document).ready(function() {
    const reactionArea = $("#reactionArea");
    const reactionMessage = $("#reactionMessage");
    const reactionInstructions = $("#reactionInstructions");
    const startButton = $("#startButton");
    const resetButton = $("#resetButton");
    const lastTime = $("#lastTime");
    const bestTime = $("#bestTime");

    let gameState = "ready";
    let startTime = 0;
    let timeoutId = null;
    let fastestTime = null;

    function updateDisplay(state, message, instructions) {
        reactionArea.removeClass("ready waiting go early");
        reactionArea.addClass(state);

        reactionMessage.text(message);
        reactionInstructions.text(instructions);

        gameState = state;
    }

    function showReadyState() {
        updateDisplay(
            "ready",
            "Ready?",
            "Press Start to begin."
        );
    }

    function startTest() {
        clearTimeout(timeoutId);

        updateDisplay(
            "waiting",
            "Wait for it...",
            "Don't click until the color changes!"
        );

        const delay = Math.floor(Math.random() * 3000) + 2000;

        timeoutId = setTimeout(function() {
            startTime = performance.now();

            updateDisplay(
                "go",
                "CLICK NOW!",
                "Click anywhere in this area!"
            );

            timeoutId = null;
        }, delay);
    }

    function handleReactionClick() {
        if (gameState === "waiting") {
            clearTimeout(timeoutId);
            timeoutId = null;
            
            updateDisplay(
                "early",
                "Too Early!",
                "You clicked before the signal. Try again!"
            );

            return;
        }

        if (gameState === "go") {
            const reactionTime = Math.round(
                performance.now() - startTime
            );

            lastTime.text(`${reactionTime} ms`);
            if (fastestTime === null || reactionTime < fastestTime) {
                fastestTime = reactionTime;
                bestTime.text(`${fastestTime} ms`);
            }

            updateDisplay(
                "ready",
                `${reactionTime} ms`,
                "Press Start to try again."
            );
        }
    }

    function resetTest() {
        clearTimeout(timeoutId);
        timeoutId = null;

        startTime = 0;
        fastestTime = null;

        lastTime.text("-- ms");
        bestTime.text("-- ms");
        
        showReadyState();
    }

    startButton.on("click", startTest);
    resetButton.on("click", resetTest);
    reactionArea.on("click", handleReactionClick);

    showReadyState();
});