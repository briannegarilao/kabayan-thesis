const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const userId = "dummy-user-123";

const { Timestamp } = require("firebase-admin/firestore");

//Sample Data
const sampleFloodRequests = [
  {
    type: "Flood",
    message: "Our ground floor is flooded, please send help.",
    urgency: "high",
    location: new admin.firestore.GeoPoint(14.2794, 121.0099),
    address: "Blk14 Lt 40, Ville De Palme, Brgy. Santiago"
  },
  {
    type: "Flood",
    message: "We are trapped by rising waters near the river.",
    urgency: "critical",
    location: new admin.firestore.GeoPoint(14.2802, 121.0105),
    address: "Brgy. Salitran 3, near Dasmariñas River"
  },
  {
    type: "Flood",
    message: "Flooded street blocking cars and pedestrians.",
    urgency: "medium",
    location: new admin.firestore.GeoPoint(14.2781, 121.0117),
    address: "Molave Street, Brgy. Sampaloc"
  },
  {
    type: "Flood",
    message: "Flood level reached chest height, we're on the roof.",
    urgency: "critical",
    location: new admin.firestore.GeoPoint(14.2818, 121.0080),
    address: "Cypress Lane, Brgy. San Jose"
  },
  {
    type: "Flood",
    message: "Rainwater entering house, urgent rescue needed.",
    urgency: "high",
    location: new admin.firestore.GeoPoint(14.2775, 121.0142),
    address: "Cattleya Subd., Brgy. Paliparan"
  }
];

//Push Request for a User
async function pushMultipleDummyRequests() {
  await db.collection("users").doc(userId).set({
    name: "Mark Brian Garilao",
    email: "mark@email.com",
    contact: "+63 968 299 8790",
    address: "Blk14 Lt 40, Ville De Palme, Brgy. Santiago"
  }, { merge: true });

  for (let i = 0; i < sampleFloodRequests.length; i++) {
    const requestId = db.collection("users").doc(userId).collection("requests").doc().id;
    const requestData = {
      ...sampleFloodRequests[i],
      timestamp: Timestamp.now(),
      status: "pending"
    };

    await db.collection("users").doc(userId).collection("requests").doc(requestId).set(requestData);
    console.log(`✅ Flood Request ${i + 1} pushed`);

    const unitId = await addUnit();
    await dispatchUnit(unitId, requestId, requestData.location);
    await saveToHistory(userId, requestId);
  }
}

//Assign Responder
async function addUnit() {
  const unitRef = db.collection("units").doc();
  const unitId = unitRef.id;

  await unitRef.set({
    type: "Responder",
    status: "available",
    currentLocation: new admin.firestore.GeoPoint(14.2811, 121.0205),
    assignedRequestId: null,
    lastUpdated: Timestamp.now()
  });

  return unitId;
}

//Active Dispatches
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

//Sync to History
async function saveToHistory(userId, requestId) {
  const userRef = db.collection("users").doc(userId);
  const requestRef = userRef.collection("requests").doc(requestId);

  const [userDoc, requestDoc] = await Promise.all([userRef.get(), requestRef.get()]);

  if (userDoc.exists && requestDoc.exists) {
    const userData = userDoc.data();
    const requestData = requestDoc.data();

    const historyEntry = {
      userId: userId,
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
pushMultipleDummyRequests();
