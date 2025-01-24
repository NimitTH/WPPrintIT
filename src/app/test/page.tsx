// "use client"
// import { useState } from "react";
// import axios from "axios";

// export default function CreateEvent() {
//   const [title, setTitle] = useState("");
//   const [eventDate, setEventDate] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/events", { title, eventDate });
//       alert("Event created successfully!");
//       setTitle("");
//       setEventDate("");
//     } catch (error) {
//       console.error(error);
//       alert("Error creating event.");
//     }
//   };

//   return (
//     <div>
//       <h1>Create Event</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Event Date:</label>
//           <input
//             type="datetime-local"
//             value={eventDate}
//             onChange={(e) => setEventDate(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Create Event</button>
//       </form>
//     </div>
//   );
// }

import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div>page</div>
  )
}