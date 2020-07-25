let db = null;

const request = indexedDB.open("budget", 1);
request.onupgradeneeded = (e) => {
  const db = e.target.result;
  let objectStore = db.createObjectStore("pending", {
    keyPath: "id",
    autoIncremet: true,
  });
};
request.onsuccess = (e) => {
  db.e.target.result;
  if (navigator.onLine) {
    checkDatabase();
  }
};
request.onerror = (e) => {
  console.err(e.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(["pending"], "readwrite");
  const pendingStore = transaction.objectStore("pending");
  pendingStore.add(record);
}
function checkDatabase() {
  const transaction = db.transaction(["pending"], "readwrite");
  const pendingStore = transaction.objectStore("pending");
  const records = pendingStore.getAll();
  records.onsuccess = function () {
    if (records.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(records.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(() => {
          const transaction = db.transaction(["pending"], "readwrite");
          const pendingStore = transaction.objectStore("pending");
          pendingStore.clear();
        });
    }
  };
}

window.addEventListener("online", checkDatabase);
