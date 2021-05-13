import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from './Spinner'
console.log("hello");

function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await axios.get("http://localhost:4000/room");

        setRooms([...response.data]);
        setLoading(false);
        console.log(response);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center">
        {loading ? (
          <Spinner className="mt-5" color="text-secondary" />
        ) : (
          <div>
            {rooms.map((room) => (
              <div className="card border-0  mb-2" key={room._id}>
                <img
                  src={room.imageUrl}
                  className="card-img-top rounded-0"
                  alt={room.caption}
                />
                <div className="card-body">
                  <div className="w-100">
                    <Link to={`/room/${room._id}`}>
                      {room.name}
                    </Link>
                  </div>
                  <p>{room.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
