const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const { Timestamp } = require("firebase-admin/firestore");

const sampleUsers = [
  {
    id: "dummy-user-1",
    name: "Mark Brian Garilao",
    email: "mark1@email.com",
    contact: "+63 900 000 0001",
    address: "Blk14 Lt 40, Ville De Palme, Brgy. Sampaloc 1",
    message: "Our ground floor is flooded, please send help.",
    urgency: "high",
    location: new admin.firestore.GeoPoint(14.3113, 120.9570)
  },
  {
    id: "dummy-user-2",
    name: "Jane Dela Cruz",
    email: "jane@email.com",
    contact: "+63 900 000 0002",
    address: "Burol Main Road, Brgy. Burol 2",
    message: "Trapped by water near the barangay hall.",
    urgency: "critical",
    location: new admin.firestore.GeoPoint(14.3182, 120.9721)
  },
  {
    id: "dummy-user-3",
    name: "Juan Santos",
    email: "juan@email.com",
    contact: "+63 900 000 0003",
    address: "Jade St, Golden City, Brgy. Salawag",
    message: "Street is flooded and no way out.",
    urgency: "medium",
    location: new admin.firestore.GeoPoint(14.3221, 120.9819)
  },
  {
    id: "dummy-user-4",
    name: "Maria Lopez",
    email: "maria@email.com",
    contact: "+63 900 000 0004",
    address: "Phase 2, Sampaloc Heights, Brgy. Sampaloc 1",
    message: "Flood water is rising fast. We need help.",
    urgency: "critical",
    location: new admin.firestore.GeoPoint(14.3127, 120.9558)
  },
  {
    id: "dummy-user-5",
    name: "Luis Mendoza",
    email: "luis@email.com",
    contact: "+63 900 000 0005",
    address: "Salitran Road, Brgy. Salawag",
    message: "Rainwater entering house, urgent rescue needed.",
    urgency: "high",
    location: new admin.firestore.GeoPoint(14.3259, 120.9825)
  }
];

async function pushOneRequestPerUser() {
  for (const user of sampleUsers) {
    await db.collection("users").doc(user.id).set({
      name: user.name,
      email: user.email,
      contact: user.contact,
      address: user.address
    }, { merge: true });

    const requestId = db.collection("users").doc(user.id).collection("requests").doc().id;
    const requestData = {
      type: "Flood",
      message: user.message,
      urgency: user.urgency,
      location: user.location,
      address: user.address,
      timestamp: Timestamp.now(),
      status: "pending"
    };

    await db.collection("users").doc(user.id).collection("requests").doc(requestId).set(requestData);
    console.log(`✅ Request created for ${user.id}`);

    const unitId = await addUnit();
    await dispatchUnit(unitId, requestId, user.location);
    await saveToHistory(user.id, requestId);
  }
}

async function addUnit() {
  const unitRef = db.collection("units").doc();
  const unitId = unitRef.id;

  await unitRef.set({
    type: "Firetruck",
    plateNumber: "ABC-1234",
    capacity: "5 crew",
    color: "Red",
    status: "available",
    currentLocation: new admin.firestore.GeoPoint(14.3165, 120.9602),
    assignedRequestId: null,
    lastUpdated: Timestamp.now()
  });

  return unitId;
}

async function dispatchUnit(unitId, requestId, location) {
  const dispatchRef = db.collection("active_dispatches").doc();
  const dispatchId = dispatchRef.id;

  await dispatchRef.set({
    unitId,
    requestId,
    location,
    startedAt: Timestamp.now(),
    status: "en route"
  });

  await db.collection("units").doc(unitId).update({
    status: "dispatched",
    assignedRequestId: requestId,
    lastUpdated: Timestamp.now()
  });

  console.log(`🚨 Dispatched unit ${unitId} to request ${requestId}`);
  return dispatchId;
}

async function saveToHistory(userId, requestId) {
  const userRef = db.collection("users").doc(userId);
  const requestRef = userRef.collection("requests").doc(requestId);

  const [userDoc, requestDoc] = await Promise.all([userRef.get(), requestRef.get()]);

  if (userDoc.exists && requestDoc.exists) {
    const userData = userDoc.data();
    const requestData = requestDoc.data();

    const historyEntry = {
      userId,
      userName: userData.name,
      userEmail: userData.email,
      contact: userData.contact,
      address: requestData.address,
      disasterType: requestData.type,
      location: requestData.location,
      timestamp: requestData.timestamp,
      status: "complete",
      message: requestData.message,
      urgency: requestData.urgency
    };

    await db.collection("history").doc(requestId).set(historyEntry);
    console.log("📦 Saved to History ✅");
  }
}

// Run
pushOneRequestPerUser();
