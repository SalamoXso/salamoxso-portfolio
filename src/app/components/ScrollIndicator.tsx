'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ScrollIndicator() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = mountRef.current;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = parent.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setClearAlpha(0);
    renderer.shadowMap.enabled = true; // Enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
    parent.appendChild(renderer.domElement);

    // Create a cylinder for the scroll bar (slightly bigger)
    const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 8, 32); // Increased radius and height
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.1, roughness: 0.5 });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(0, 0, 0); // Position the cylinder
    cylinder.rotation.y = Math.PI / 6; // Rotate 30 degrees (π/6 radians) to the right
    cylinder.castShadow = true; // Enable shadow casting
    cylinder.receiveShadow = true; // Enable shadow receiving
    scene.add(cylinder);

    // Create a sphere for the scroll progress indicator (slightly bigger)
    const sphereGeometry = new THREE.SphereGeometry(0.25, 32, 32); // Increased radius
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x007bff, metalness: 0.2, roughness: 0.4 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 4, 0); // Start at the top of the cylinder
    sphere.rotation.y = Math.PI / 6; // Rotate 30 degrees (π/6 radians) to the right
    sphere.castShadow = true; // Enable shadow casting
    sphere.receiveShadow = true; // Enable shadow receiving
    scene.add(sphere);

    // Add a ground plane for shadows
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.set(0, -4, -2); // Position the ground
    ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    ground.receiveShadow = true; // Enable shadow receiving
    scene.add(ground);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true; // Enable shadow casting
    directionalLight.shadow.mapSize.width = 1024; // Shadow resolution
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 20;
    scene.add(directionalLight);

    // Position the camera
    camera.position.set(5, 0, 10); // Move the camera to the right and back
    camera.lookAt(0, 0, 0); // Make the camera look at the center of the scene

    // Handle scroll events
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = (scrollY / maxScroll) * 100;

      // Update sphere position based on scroll progress
      const cylinderHeight = 8; // Height of the cylinder
      const sphereY = 4 - (cylinderHeight * progress) / 100; // Move from top to bottom
      sphere.position.y = sphereY;
    };

    window.addEventListener('scroll', handleScroll);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      parent.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed left-8 top-1/2 transform -translate-y-1/2 h-[80vh] w-1 z-10"
    />
  );
}