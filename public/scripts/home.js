const sidebar = document.querySelector("aside");

const handleClick = (event) => {
  const target = event.target;
  if (target.className.includes("friend")) {
    target.classList.toggle("active");
  }
};

sidebar.addEventListener("click", handleClick);
