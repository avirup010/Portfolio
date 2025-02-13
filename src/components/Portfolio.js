import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canvasRef = useRef(null);

  const personalInfo = {
    name: "Avirup Ghosh",
    title: "Software Developer",
    bio: "Passionate developer focused on creating innovative solutions",
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://www.linkedin.com/in/avirup-ghosh-thebetterone"
  };

  // Three.js initialization
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: '#2196f3'
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Camera position
    camera.position.z = 3;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup
      window.removeEventListener('resize', handleResize);
      canvasRef.current?.removeChild(renderer.domElement);
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const projects = [
    {
      title: "Project 1",
      description: "Description of project 1",
      tech: ["React", "Three.js", "Tailwind"],
      link: "#"
    },
    // Add more projects here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Three.js Canvas */}
      <div ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      
      {/* Rest of the JSX remains exactly the same as in the previous artifact */}
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#home" className="text-2xl font-bold text-blue-400">
              {personalInfo.name}
            </a>

            {/* Mobile menu button */}
            <button 
              className="sm:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop menu */}
            <div className="hidden sm:flex space-x-8">
              <a href="#home" className="text-white hover:text-blue-400 transition-colors">Home</a>
              <a href="#about" className="text-white hover:text-blue-400 transition-colors">About</a>
              <a href="#projects" className="text-white hover:text-blue-400 transition-colors">Projects</a>
              <a href="#contact" className="text-white hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="sm:hidden bg-black bg-opacity-95 px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-white hover:text-blue-400">Home</a>
              <a href="#about" className="block px-3 py-2 text-white hover:text-blue-400">About</a>
              <a href="#projects" className="block px-3 py-2 text-white hover:text-blue-400">Projects</a>
              <a href="#contact" className="block px-3 py-2 text-white hover:text-blue-400">Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            {personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            {personalInfo.title}
          </p>
          <p className="max-w-2xl mx-auto text-gray-400 mb-12">
            {personalInfo.bio}
          </p>
          <div className="flex justify-center space-x-6">
            <a href={personalInfo.github} className="transform hover:scale-110 transition-transform">
              <Github size={28} className="text-white hover:text-blue-400" />
            </a>
            <a href={personalInfo.linkedin} className="transform hover:scale-110 transition-transform">
              <Linkedin size={28} className="text-white hover:text-blue-400" />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="transform hover:scale-110 transition-transform">
              <Mail size={28} className="text-white hover:text-blue-400" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
            <p className="text-gray-300 leading-relaxed mb-6">
              I'm a software developer passionate about creating innovative solutions.
              With expertise in modern web technologies, I focus on building responsive
              and interactive applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black bg-opacity-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Three.js", "Tailwind CSS", "JavaScript", "Node.js"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-500 bg-opacity-20 rounded-full text-blue-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-black bg-opacity-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Education</h3>
                <p className="text-gray-300">
                  SRMIST<br />
                  BTech - Electronics and Computer Engineering<br />
                  2022-2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-500 bg-opacity-20 rounded-full text-sm text-blue-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.link} className="text-blue-400 hover:text-blue-300">
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-20 px-4">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Contact Info</h3>
                <div className="space-y-4">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-3 text-gray-300 hover:text-blue-400">
                    <Mail size={20} />
                    <span>{personalInfo.email}</span>
                  </a>
                  <a href={personalInfo.linkedin} className="flex items-center space-x-3 text-gray-300 hover:text-blue-400">
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                  </a>
                  <a href={personalInfo.github} className="flex items-center space-x-3 text-gray-300 hover:text-blue-400">
                    <Github size={20} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 bg-black bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 bg-black bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-2 bg-black bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
                <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;