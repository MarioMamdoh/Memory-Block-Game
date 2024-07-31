let blocks = document.querySelectorAll(".game-block");
let blocksArray = Array.from(blocks);
let orderArray = Array.from(blocks.keys());
let blocksContainer = document.querySelector(".memory-game-blocks");
shuffleOrderNum(orderArray);
document
  .querySelector(".control-buttons span")
  .addEventListener("click", () => {
    let yourName = prompt("What Is Your Name");
    document.querySelector(".control-buttons").style.display = "none";
    document.querySelector(".info-container .name span").innerHTML = yourName;
    blocks.forEach((block) => {
      block.classList.add("is-flipped");
      setTimeout(() => {
        block.classList.remove("is-flipped");
      }, 3000);
    });
  });

blocks.forEach((block, index) => {
  block.style.order = orderArray[index];
  block.addEventListener("click", () => {
    flipClick(block);
  });
});

function flipClick(block) {
  block.classList.add("is-flipped");
  let allFlippedBlocks = blocksArray.filter((flippedblock) =>
    flippedblock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, 1000);
}

function checkMatchedBlocks(firstBlock, SecondBlock) {
  let triesOfWrong = document.querySelector(".info-container .tries span");

  if (firstBlock.dataset.technology === SecondBlock.dataset.technology) {
    document.querySelector("#success").play();
    firstBlock.classList.remove("is-flipped");
    SecondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    SecondBlock.classList.add("has-match");
  } else {
    triesOfWrong.innerHTML++;
    document.querySelector("#fail").play();
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      SecondBlock.classList.remove("is-flipped");
    }, 1000);
  }
}

function shuffleOrderNum(orderArray) {
  let current = orderArray.length;
  let temp, random;
  while (current > 0) {
    random = parseInt(Math.random() * current);
    current--;
    temp = orderArray[current];
    orderArray[current] = orderArray[random];
    orderArray[random] = temp;
  }
  return orderArray;
}
document.querySelector(".restart").onclick = () => {
  location.reload();
};
