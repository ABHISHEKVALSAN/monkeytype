import * as Notifications from "./notifications";
// import * as VersionPopup from "./version-popup";

function setMemory(v) {
  window.localStorage.setItem("lastSeenVersion", v);
}

function getMemory() {
  return window.localStorage.getItem("lastSeenVersion") ?? "";
}

export async function show(version) {
  const memory = await getMemory();
  if (memory === "") {
    setMemory(version);
    return;
  }
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    caches.keys().then(function (names) {
      for (let name of names) caches.delete(name);
    });
  }
  if (memory === version) return;
  caches.keys().then(function (names) {
    for (let name of names) caches.delete(name);
  });
  Notifications.addBanner(
    `Version ${version} has been released. Click the version number in the bottom right to view the changelog.`,
    1,
    "code-branch",
    false
  );
  setMemory(version);
}
