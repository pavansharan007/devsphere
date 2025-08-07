import React, { useEffect, useState } from "react";
import services from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import PostProject from "../components/PostProject";
import HomePost from "../components/HomePost";
function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    services.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <div
        className="flex flex-col items-center justify-center text-center mb-8"
        style={{ minHeight: "80vh" }}
      >
        <h1 className="text-white text-7xl">Where Devs Orbit</h1>
        <h1 className="text-7xl text-white">Their Projects</h1>
        <div className="py-4 text-gray-400">
          <p>Show case and discover amazing projects</p>
          <p>created by develpoers</p>
        </div>
        <div className="py-6">
          <button
            className="bg-cyan-500 text-black font-semibold px-6 py-3 rounded-md hover:bg-cyan-400 transition"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
          <button
            className="bg-black text-white font-semibold px-6 py-3 ml-2 rounded-md hover:bg-gray-900 border border-white opacity-50 transition"
            onClick={() => navigate("/all-post")}
          >
            View Projects{' >'}
          </button>
        </div>
      </div>
     <HomePost />
    </div>
    
  );
}

export default Home;
