// app/dashboard/respond/sampleData.ts

import { Responder } from "./RespondSection";

const sampleResponders: Responder[] = [
  {
    id: "r1",
    name: "Engine 01",
    type: "Firetruck",
    capacity: "5 crew",
    plate: "ABC-1234",
    color: "Red",
    status: "Idle",
  },
  {
    id: "r2",
    name: "Boat Bravo",
    type: "Boat",
    capacity: "6 pax",
    plate: "BOAT-001",
    color: "Blue",
    status: "Idle",
  },
  {
    id: "r3",
    name: "Ambulance X",
    type: "Ambulance",
    capacity: "2 patients",
    plate: "AMB-2025",
    color: "White",
    status: "On Duty",
  },
];

export default sampleResponders;
