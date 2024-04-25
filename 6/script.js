gsap.to(".box", {
  keyframes: {
    y: [0, 80, -10, 30, 0],
    ease: "none",
    easeEach: "power2.inOut" 
  },
  rotate: 180,
  ease: "elastic",
  duration: 5,
  stagger: 0.2
});
