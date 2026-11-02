const friendData = [
  { name: "pixelnova_01", status: "online" },
  { name: "zaxxy", status: "online" },
  { name: "azeria", status: "away" },
  { name: "goobmaster", status: "online" },
  { name: "r3dskull", status: "offline" }
];

const friendList = document.getElementById("friendList");
const friendsPanelList = document.getElementById("friendsPanelList");
const friendNameInput = document.getElementById("friendNameInput");
const onlineCount = document.getElementById("onlineCount");
const toast = document.getElementById("toast");

function updateOnlineCount() {
  const online = friendData.filter((friend) => friend.status === "online").length;
  onlineCount.textContent = `${online} online`;
}

function renderFriends() {
  friendList.innerHTML = "";
  friendsPanelList.innerHTML = "";

  friendData.forEach((friend) => {
    const item = document.createElement("div");
    item.className = "friend-item";

    item.innerHTML = `
      <div class="user">
        <div class="friend-avatar"></div>
        <span>${friend.name}</span>
      </div>
      <div class="actions">
        <span class="status-dot" title="${friend.status}"></span>
        <button class="delete-btn" data-name="${friend.name}">Remove</button>
      </div>
    `;

    friendList.appendChild(item);

    const panelItem = document.createElement("div");
    panelItem.className = "friend-item";
    panelItem.innerHTML = `
      <div class="user">
        <div class="friend-avatar"></div>
        <span>${friend.name}</span>
      </div>
      <button class="delete-btn" data-name="${friend.name}">X</button>
    `;
    friendsPanelList.appendChild(panelItem);
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const index = friendData.findIndex((friend) => friend.name === name);
      if (index !== -1) {
        friendData.splice(index, 1);
        renderFriends();
        updateOnlineCount();
        showToast(`${name} removed from friends`);
      }
    });
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("visible");
  }, 1800);
}

function handleFriendAdd() {
  const value = friendNameInput.value.trim();
  if (!value) {
    showToast("Enter a username first");
    return;
  }

  if (friendData.some((friend) => friend.name.toLowerCase() === value.toLowerCase())) {
    showToast("Friend already added");
    friendNameInput.value = "";
    return;
  }

  friendData.unshift({ name: value, status: "online" });
  renderFriends();
  updateOnlineCount();
  friendNameInput.value = "";
  showToast(`${value} added as a friend`);
}

document.getElementById("submitFriend").addEventListener("click", handleFriendAdd);
document.getElementById("addFriendBtn").addEventListener("click", () => {
  friendNameInput.focus();
});

friendNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleFriendAdd();
  }
});

document.querySelectorAll(".join-btn, .play-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const game = button.dataset.game || "Roblox game";
    showToast(`Joining ${game}...`);
  });
});

document.getElementById("viewProfileBtn").addEventListener("click", () => {
  const profileName = document.getElementById("profileName");
  profileName.textContent = profileName.textContent === "CraziAce" ? "CreatorCrazi" : "CraziAce";
  showToast("Profile view updated");
});

const skinTone = document.getElementById("skinTone");
const heightScale = document.getElementById("heightScale");
const shirtStyle = document.getElementById("shirtStyle");
const accessoryStyle = document.getElementById("accessoryStyle");
const avatarCharacter = document.getElementById("avatarCharacter");
const editorAvatar = document.getElementById("editorAvatar");

function setAvatarAppearance() {
  const skinValue = Number(skinTone.value);
  const heightValue = Number(heightScale.value);

  const skinColor =
    skinValue < 25 ? "#d9a979" : skinValue < 50 ? "#c98f5d" : skinValue < 75 ? "#9d7040" : "#6f4d2d";

  const shirtColor =
    shirtStyle.value === "classic"
      ? "#4ba5ff"
      : shirtStyle.value === "sport"
        ? "#ff7f50"
        : "#7c5cff";

  avatarCharacter.style.setProperty("--skin", skinColor);
  avatarCharacter.style.setProperty("--shirt", shirtColor);
  avatarCharacter.style.setProperty("--avatar-scale", (heightValue / 100).toFixed(2));

  editorAvatar.style.setProperty("--skin", skinColor);
  editorAvatar.style.setProperty("--shirt", shirtColor);
  editorAvatar.style.setProperty("--avatar-scale", (heightValue / 100).toFixed(2));

  const accessory = accessoryStyle.value;
  editorAvatar.classList.toggle("accessory-present", accessory !== "none");
  avatarCharacter.classList.toggle("accessory-present", accessory !== "none");

  if (accessory === "visor") {
    editorAvatar.style.setProperty("--acc-color", "#2f2f46");
  } else if (accessory === "hat") {
    editorAvatar.style.setProperty("--acc-color", "#f59e0b");
  } else if (accessory === "glasses") {
    editorAvatar.style.setProperty("--acc-color", "#111827");
  } else {
    editorAvatar.style.setProperty("--acc-color", "#ffffff");
  }
}

skinTone.addEventListener("input", setAvatarAppearance);
heightScale.addEventListener("input", setAvatarAppearance);
shirtStyle.addEventListener("change", setAvatarAppearance);
accessoryStyle.addEventListener("change", setAvatarAppearance);

renderFriends();
updateOnlineCount();
setAvatarAppearance();
