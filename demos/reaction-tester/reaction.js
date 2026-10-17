"use strict";

$(document).ready(function() {
    const reactionArea = $("#reactionArea");
    const reactionMessage = $("#reactionMessage");
    const reactionInstructions = $("#reactionInstructions");

    function showReadyState() {
        reactionArea.removeClass("waiting go early");
        reactionArea.addClass("ready");

        reactionMessage.text("Ready?");
        reactionInstructions.text("Press Start to begin.");
    }

    showReadyState();
});