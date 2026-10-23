"use strict";

/* ============================================================
   Assignment #5 – Part 2 (individual)
   Student: Ayaulym Nurakysheva, group MT-2504
   Plain JavaScript, listeners via addEventListener().
   ============================================================ */

/* ---------------- TASK 6: Counter ---------------- */
const counterValue = document.getElementById("counterValue");
const counterNote = document.getElementById("counterNote");
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");
const resetBtn = document.getElementById("resetBtn");

let counter = 0;

// One function updates everything that is shown for the counter.
function updateCounter(message) {
  counterValue.textContent = counter;
  decreaseBtn.disabled = counter === 0;
  counterNote.textContent = message || "";
}

increaseBtn.addEventListener("click", function () {
  counter++;
  updateCounter();
});

decreaseBtn.addEventListener("click", function () {
  if (counter > 0) {
    counter--;
    updateCounter(counter === 0 ? "The counter is at its minimum (0)." : "");
  }
});

resetBtn.addEventListener("click", function () {
  counter = 0;
  updateCounter("Counter has been reset.");
});

updateCounter();

/* ---------------- TASK 7: Live text preview ---------------- */
const previewInput = document.getElementById("previewInput");
const previewText = document.getElementById("previewText");
const charCount = document.getElementById("charCount");
const clearBtn = document.getElementById("clearBtn");
const PLACEHOLDER_TEXT = "Your text will appear here";

function updatePreview() {
  const value = previewInput.value;
  charCount.textContent = value.length;
  if (value.length === 0) {
    previewText.textContent = PLACEHOLDER_TEXT;
    previewText.classList.add("empty");
  } else {
    previewText.textContent = value; // textContent: safe, no HTML injection
    previewText.classList.remove("empty");
  }
}

// "input" fires on typing, pasting, cutting and deleting.
previewInput.addEventListener("input", updatePreview);

clearBtn.addEventListener("click", function () {
  previewInput.value = "";
  updatePreview();
  previewInput.focus();
});

updatePreview();

/* ---------------- TASK 8: Image select ---------------- */
const imageSelect = document.getElementById("imageSelect");
const selectedImage = document.getElementById("selectedImage");
const imageCaption = document.getElementById("imageCaption");

const imageData = {
  camera: {
    src: "images/camera.png",
    alt: "Illustration of a camera with a large lens",
    caption: "Camera — captures the picture."
  },
  film: {
    src: "images/film.png",
    alt: "Illustration of a film reel with a strip of film",
    caption: "Film reel — stores the story frame by frame."
  },
  microphone: {
    src: "images/microphone.png",
    alt: "Illustration of a studio microphone on a stand",
    caption: "Microphone — records the voice and sound."
  },
  headphones: {
    src: "images/headphones.png",
    alt: "Illustration of over-ear headphones",
    caption: "Headphones — help to edit and check the sound."
  }
};

function showSelectedImage() {
  const item = imageData[imageSelect.value];
  if (!item) return;
  selectedImage.src = item.src;
  selectedImage.alt = item.alt;
  imageCaption.textContent = item.caption;
}

imageSelect.addEventListener("change", showSelectedImage);

// Valid initial state when the page loads (first option is selected).
imageSelect.selectedIndex = 0;
showSelectedImage();

/* ---------------- TASK 9: Keyboard events ---------------- */
const keyForm = document.getElementById("keyForm");
const keyInput = document.getElementById("keyInput");
const keyStatus = document.getElementById("keyStatus");
const keyResult = document.getElementById("keyResult");

function setKeyResult(text) {
  if (text) {
    keyResult.textContent = text;
    keyResult.classList.remove("empty");
  } else {
    keyResult.textContent = "Nothing submitted yet.";
    keyResult.classList.add("empty");
  }
}

// The listener is attached to the input itself, so it only works while the input has focus.
keyInput.addEventListener("keydown", function (event) {
  const keyName = event.key === " " ? "Space" : event.key;
  keyStatus.textContent = "You pressed: " + keyName;

  if (event.key === "Enter") {
    event.preventDefault(); // no unintended form submission
    const text = keyInput.value.trim();
    if (text === "") {
      setKeyResult("");
      keyStatus.textContent = "Enter pressed, but the input is empty.";
    } else {
      setKeyResult(text);
    }
  } else if (event.key === "Escape") {
    keyInput.value = "";
    setKeyResult("");
    keyStatus.textContent = "Escape pressed: input and result cleared.";
  }
});

// Safety net: the form itself must never reload the page.
keyForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

/* ---------------- TASK 10: Mouse and focus events ---------------- */
const hoverCard = document.getElementById("hoverCard");
const hoverInstruction = document.getElementById("hoverInstruction");
const DEFAULT_INSTRUCTION = "Move the mouse over the card or focus it with the Tab key.";

function highlightCard(how) {
  hoverCard.classList.add("highlight");
  hoverInstruction.textContent = how === "mouse"
    ? "The mouse is over the card (mouseenter)."
    : "The card has keyboard focus (focus).";
}

function resetCard() {
  hoverCard.classList.remove("highlight");
  hoverInstruction.textContent = DEFAULT_INSTRUCTION;
}

hoverCard.addEventListener("mouseenter", function () { highlightCard("mouse"); });
hoverCard.addEventListener("mouseleave", resetCard);
hoverCard.addEventListener("focus", function () { highlightCard("keyboard"); });
hoverCard.addEventListener("blur", resetCard);
