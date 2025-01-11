'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

interface ThreeDCardProps {
  title: string;
  description: string;
  tags: string[];
}

const ThreeDCard = ({ title, description, tags }: ThreeDCardProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    renderer.sortObjects = true;
    parent.appendChild(renderer.domElement);
  
    // Create a group to hold the card and text
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);
  
    // Load a font for 3D text
    const fontLoader = new FontLoader();
    fontLoader.load(
      'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', // Example font
      (font) => {
        // Function to split text into lines based on max width
        const wrapText = (text: string, maxWidth: number, size: number) => {
          const words = text.split(' ');
          const lines: string[] = [];
          let currentLine = words[0];
  
          for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine + ' ' + word;
            const testGeometry = new TextGeometry(testLine, {
              font: font,
              size: size,
              height: 0.05,
            });
            testGeometry.computeBoundingBox(); // Compute bounding box
            const boundingBox = testGeometry.boundingBox;
            if (boundingBox && boundingBox.max.x - boundingBox.min.x <= maxWidth) {
              currentLine = testLine;
            } else {
              lines.push(currentLine);
              currentLine = word;
            }
          }
          lines.push(currentLine);
          return lines;
        };
  
        // Create 3D text for the title
        const titleLines = wrapText(title, 8, 0.5); // Max width of 8 units for title
        titleLines.forEach((line, index) => {
          const titleGeometry = new TextGeometry(line, {
            font: font,
            size: 0.5,
            height: 0.05,
          });
          const titleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
          const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
          titleMesh.position.set(-4.5, 2 - index * 0.6, 0.3); // Stack lines vertically
          titleMesh.renderOrder = 1;
          cardGroup.add(titleMesh);
        });
  
        // Create 3D text for the description
        const descriptionLines = wrapText(description, 8, 0.3); // Max width of 8 units for description
        descriptionLines.forEach((line, index) => {
          const descriptionGeometry = new TextGeometry(line, {
            font: font,
            size: 0.3,
            height: 0.05,
          });
          const descriptionMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
          const descriptionMesh = new THREE.Mesh(descriptionGeometry, descriptionMaterial);
          descriptionMesh.position.set(-4.5, 1 - index * 0.4, 0.3); // Stack lines vertically
          descriptionMesh.renderOrder = 1;
          cardGroup.add(descriptionMesh);
        });
  
        // Create 3D text for the tags
        tags.forEach((tag, index) => {
          const tagGeometry = new TextGeometry(tag, {
            font: font,
            size: 0.2,
            height: 0.05,
          });
          const tagMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
          const tagMesh = new THREE.Mesh(tagGeometry, tagMaterial);
          tagMesh.position.set(-4.5, -0.5 - index * 0.4, 0.3); // Position tags vertically
          tagMesh.renderOrder = 1;
          cardGroup.add(tagMesh);
        });
      }
    );
  
    // Create a shape for extrusion (card background)
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(10, 0); // Card width
    shape.lineTo(10, 6); // Card height
    shape.lineTo(0, 6);
    shape.lineTo(0, 0);
  
    // Extrude settings
    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };
  
    // Create extruded geometry for the card
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const card = new THREE.Mesh(geometry, material);
    card.position.set(-5, -3, 0); // Center the card within the group
    card.renderOrder = 0; // Ensure card is rendered behind text
    cardGroup.add(card);
  
    // Position the camera
    camera.position.z = 10; // Adjusted camera position
  
    // Add lighting to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Increased intensity
    scene.add(ambientLight);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Increased intensity
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
  
    // Animation logic
    let targetRotation = 0;
    let currentRotation = 0;
  
    const animate = () => {
      requestAnimationFrame(animate);
      currentRotation = THREE.MathUtils.lerp(currentRotation, targetRotation, 0.1);
      cardGroup.rotation.y = currentRotation;
      renderer.render(scene, camera);
    };
  
    animate();
  
    // Hover event handlers
    const handleMouseEnter = () => {
      setIsHovered(true);
      targetRotation = 0.3;
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
      targetRotation = 0;
    };
  
    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);
  
    // Cleanup
    return () => {
      parent.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [title, description, tags]);
  
  return (
    <div
      ref={mountRef}
      className="three-d-card w-full h-[500px]" // Increase height for a larger card
    />
  );

  return (
    <div
      ref={mountRef}
      className="three-d-card w-full h-[500px]" // Increase height for a larger card
    />
  );
};

export default ThreeDCard;