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
    <div className="w-full bg-[#0a0a0a] overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-4"
        style={{ minHeight: "90vh" }}
      >
        {/* Badge */}
        <div className="mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-fade-in">
          <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">
            Community Driven
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-white text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none mb-4">
          Where Devs Orbit <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Their Projects
          </span>
        </h1>

        {/* Subtext */}
        <div className="max-w-2xl py-4 text-gray-400 text-lg sm:text-xl font-medium">
          <p>
            Showcase and discover amazing projects <br className="hidden sm:block" />
            created by developers.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="py-8 flex flex-col sm:flex-row gap-4">
          <button
            className="group relative bg-cyan-500 text-black font-bold px-8 py-4 rounded-xl hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] active:scale-95"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
          
          <button
            className="flex items-center justify-center bg-white/5 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 active:scale-95"
            onClick={() => navigate("/all-post")}
          >
            View Projects 
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Scroll Indicator Icon (Optional Visual) */}
        <div className="absolute bottom-10 animate-bounce opacity-30">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
             <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Projects Section Wrapper */}
      <div className="relative z-10 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto py-20 px-4">
           <HomePost />
        </div>
      </div>

      {/* Bottom Ambience */}
      <div className="fixed bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none -z-10"></div>
    </div>
  );
}

export default Home;