import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BloomPass } from 'three/addons/postprocessing/BloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/addons/shaders/CopyShader.js';

interface ThreeDCardProps {
  title: string;
  description: string;
  tags: string[];
}

const ThreeDCard = ({ title, description, tags }: ThreeDCardProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredText, setHoveredText] = useState<THREE.Mesh | null>(null);

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

    // Post-processing: Bloom effect
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new BloomPass(1, 5, 0.1, 512); // Adjust bloom parameters
    composer.addPass(bloomPass);

    const copyPass = new ShaderPass(CopyShader); // Use CopyShader
    composer.addPass(copyPass);

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
              depth: 0.05, // Use depth instead of height
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

        // Declare mouse and raycaster outside the loop
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        // Create 3D text for the title
        const titleLines = wrapText(title, 8, 0.5); // Max width of 8 units for title
        const titleMeshes: THREE.Mesh[] = [];
        titleLines.forEach((line, index) => {
          const titleGeometry = new TextGeometry(line, {
            font: font,
            size: 0.5,
            depth: 0.05, // Use depth instead of height
          });
          const titleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White text
          const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
          titleMesh.position.set(-4.5, 2 - index * 0.6, 0.6); // Position on the front face
          titleMesh.renderOrder = 1; // Ensure text is rendered in front
          titleMesh.userData.originalPosition = titleMesh.position.clone(); // Store original position
          cardGroup.add(titleMesh);
          titleMeshes.push(titleMesh);
        });

        // Create 3D text for the description
        const descriptionLines = wrapText(description, 8, 0.3); // Max width of 8 units for description
        const descriptionMeshes: THREE.Mesh[] = [];
        descriptionLines.forEach((line, index) => {
          const descriptionGeometry = new TextGeometry(line, {
            font: font,
            size: 0.3,
            depth: 0.05, // Use depth instead of height
          });
          const descriptionMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White text
          const descriptionMesh = new THREE.Mesh(descriptionGeometry, descriptionMaterial);
          descriptionMesh.position.set(-4.5, 1 - index * 0.4, 0.6); // Position on the front face
          descriptionMesh.renderOrder = 1; // Ensure text is rendered in front
          descriptionMesh.userData.originalPosition = descriptionMesh.position.clone(); // Store original position
          cardGroup.add(descriptionMesh);
          descriptionMeshes.push(descriptionMesh);
        });

        // Create 3D text for the tags
        const tagMeshes: THREE.Mesh[] = [];
        tags.forEach((tag, index) => {
          const tagGeometry = new TextGeometry(tag, {
            font: font,
            size: 0.2,
            depth: 0.05, // Use depth instead of height
          });
          const tagMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White text
          const tagMesh = new THREE.Mesh(tagGeometry, tagMaterial);
          tagMesh.position.set(-4.5, -0.5 - index * 0.4, 0.6); // Position on the front face
          tagMesh.renderOrder = 1; // Ensure text is rendered in front
          tagMesh.userData.originalPosition = tagMesh.position.clone(); // Store original position
          cardGroup.add(tagMesh);
          tagMeshes.push(tagMesh);
        });

        // Add a single mousemove event listener
        parent.addEventListener('mousemove', (event) => {
          // Calculate mouse position in normalized device coordinates (-1 to +1)
          mouse.x = (event.clientX / width) * 2 - 1;
          mouse.y = -(event.clientY / height) * 2 + 1;

          // Update the raycaster
          raycaster.setFromCamera(mouse, camera);

          // Check for intersections with all text meshes
          const textMeshes = [...titleMeshes, ...descriptionMeshes, ...tagMeshes];
          const intersects = raycaster.intersectObjects(textMeshes);

          if (intersects.length > 0) {
            const hoveredMesh = intersects[0].object;
            setHoveredText(hoveredMesh);
            hoveredMesh.userData.isHovered = true;
            hoveredMesh.userData.targetPosition.copy(hoveredMesh.userData.originalPosition).add(new THREE.Vector3(0, 0.2, 0.2)); // Move up and forward
            hoveredMesh.userData.targetColor.set(0x0000ff); // Change hover color to blue
          } else if (hoveredText) {
            setHoveredText(null);
            hoveredText.userData.isHovered = false;
            hoveredText.userData.targetPosition.copy(hoveredText.userData.originalPosition); // Reset position
            hoveredText.userData.targetColor.set(0xffffff); // Reset color to white
          }
        });
      }
    );

    // Card dimensions
    const cardWidth = 10;
    const cardHeight = 6;
    const cardDepth = 0.5; // Thickness of the card
    const radius = 0.5; // Radius for rounded edges

    // Create a rounded box manually
    const shape = new THREE.Shape();
    const x = -cardWidth / 2;
    const y = -cardHeight / 2;
    shape.moveTo(x + radius, y);
    shape.lineTo(x + cardWidth - radius, y);
    shape.quadraticCurveTo(x + cardWidth, y, x + cardWidth, y + radius);
    shape.lineTo(x + cardWidth, y + cardHeight - radius);
    shape.quadraticCurveTo(x + cardWidth, y + cardHeight, x + cardWidth - radius, y + cardHeight);
    shape.lineTo(x + radius, y + cardHeight);
    shape.quadraticCurveTo(x, y + cardHeight, x, y + cardHeight - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    // Extrude settings
    const extrudeSettings = {
      depth: cardDepth,
      bevelEnabled: true,
      bevelSize: 0.1,
      bevelThickness: 0.1,
      bevelSegments: 8,
    };

    // Create extruded geometry for the card
    const cardGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const cardMaterial = new THREE.MeshBasicMaterial({ color: 0xadd8e6, side: THREE.DoubleSide }); // Light Blue card
    const card = new THREE.Mesh(cardGeometry, cardMaterial);
    card.position.set(0, 0, 0); // Center the card
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
    let targetRotation = 0; // Target rotation for hover
    let currentRotation = 0; // Current rotation for smooth animation

    const animate = () => {
      requestAnimationFrame(animate);

      // Smoothly interpolate rotation
      currentRotation = THREE.MathUtils.lerp(currentRotation, targetRotation, 0.1);
      cardGroup.rotation.y = currentRotation; // Rotate the entire group

      // Update hovered text position and color
      if (hoveredText) {
        hoveredText.position.lerp(hoveredText.userData.targetPosition, 0.1);
        (hoveredText.material as THREE.MeshBasicMaterial).color.lerp(hoveredText.userData.targetColor, 0.1);
      }

      // Render the scene with post-processing
      composer.render();
    };

    animate();

    // Hover event handlers for the card
    const handleMouseEnter = () => {
      targetRotation = 0.3; // Rotate slightly on Y-axis
    };

    const handleMouseLeave = () => {
      targetRotation = 0; // Return to original rotation
    };

    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      parent.removeChild(renderer.domElement);
      cardGeometry.dispose();
      cardMaterial.dispose();
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      parent.removeEventListener('mousemove', () => {});
    };
  }, [title, description, tags, hoveredText]);

  return (
    <div
      ref={mountRef}
      className="three-d-card w-full h-[500px]" // Increase height for a larger card
    />
  );
};

export default ThreeDCard;