// const swiper = new Swiper('.slider-main-block', {
// 	// Optional parameters
// 	loop: true,
// 	// Navigation arrows
// 	navigation: {
// 		nextEl: '.body-main-block__arrow.swiper-button-next',
// 		prevEl: '.body-main-block__arrow.swiper-button-prev',
// 	},
// });

// // Таби
// const tabNavItems = document.querySelectorAll('.tabs-deals__button');
// const tabItems = document.querySelectorAll('.item-tabs');
// document.addEventListener("click", function (e) {
// 	const targetElement = e.target;
// 	let currentActiveIndex = null;
// 	let newActiveIndex = null;
// 	if (targetElement.closest('.tabs-deals__button')) {
// 		tabNavItems.forEach((tabNavItem, index) => {
// 			if (tabNavItem.classList.contains('active')) {
// 				currentActiveIndex = index;
// 				tabNavItem.classList.remove('active');
// 			}
// 			if (tabNavItem === targetElement) {
// 				newActiveIndex = index;
// 			}
// 		});
// 		targetElement.classList.add('active');
// 		tabItems[currentActiveIndex].classList.remove('active');
// 		tabItems[newActiveIndex].classList.add('active');
// 	}
// });
// Swiper //
const swiper = new Swiper(".slider-main-block", {
  // Optional parameters
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: ".body-main-block__arrow.swiper-button-next",
    prevEl: ".body-main-block__arrow.swiper-button-prev",
  },
});
// Tabs //
const tabNavItems = document.querySelectorAll(".tabs-deals__button");
const tabItems = document.querySelectorAll(".item-tabs");

document.addEventListener("click", function (e) {
  const targetElement = e.target;
  let currentActiveIndex = null;
  let newActiveIndex = null;
  if (targetElement.closest(".tabs-deals__button")) {
    tabNavItems.forEach((tabNavItem, index) => {
      if (tabNavItem.classList.contains("active")) {
        currentActiveIndex = index;
        tabNavItem.classList.remove("active");
      }
      if (tabNavItem === targetElement) {
        newActiveIndex = index;
      }
    });
    targetElement.classList.add("active");
    tabItems[currentActiveIndex].classList.remove("active");
    tabItems[newActiveIndex].classList.add("active");
  }
});

let userListVisible = false;

async function fetchUsers() {
  const userInput = document
    .getElementById("userInput")
    .value.trim()
    .toLowerCase();
  const userList = document.getElementById("userList");
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await response.json();
  const sortedUsers = data.sort((a, b) => a.name.localeCompare(b.name));

  userList.innerHTML = "";
  if (userInput === "" && !userListVisible) {
    userList.innerHTML = "";
  } else {
    const filteredUsers = sortedUsers.filter((user) =>
      user.name.toLowerCase().includes(userInput)
    );

    if (filteredUsers.length > 0) {
      filteredUsers.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = user.name;
        listItem.addEventListener("click", function () {
          document.getElementById("userInput").value = user.name;
          userListVisible = false;
          userList.innerHTML = "";
        });
        userList.appendChild(listItem);
      });
    } else {
      const noUsersMessage = document.createElement("li");
      noUsersMessage.textContent = "No Users!";
      noUsersMessage.style.color = "red";
      userList.appendChild(noUsersMessage);
    }
  }
}

function showUserList() {
  userListVisible = true;
  fetchUsers();
}

document.addEventListener("click", function (event) {
  const userInput = document.getElementById("userInput");
  const userList = document.getElementById("userList");
  if (!userInput.contains(event.target) && !userList.contains(event.target)) {
    userListVisible = false;
    userList.innerHTML = "";
  }
});
