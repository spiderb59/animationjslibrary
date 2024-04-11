let width = document.querySelector('.timelineUI').offsetWidth

let tl = gsap.timeline({ onUpdate: sequenceUpdateDragger, paused: true });

tl
  .to("#green", { x: width, xPercent: -100, duration: 2 })
  .to("#purple", { x: width, xPercent: -100, duration: 1 })
  .to("#orange", { x: width,  xPercent: -100, duration: 1 });


gsap.to('.timelineUI-tween', {opacity: 1})
let sequenceTime = $("#sequenceTime");
let markerCont = document.querySelector(".markers");
markerCont.innerHTML = '';
let sequenceTrackLength = width;
let sequenceDragger = $("#sequence .timelineUI-dragger");
let timelineItems = document.querySelectorAll(".timelineUI-tween");
let children = tl.getChildren();
let time = tl.duration();

for (let i = 0; i < time + 1; i++) {
  markerCont.innerHTML += `<div class="secondMarker"></div>`;
}

function sequenceUpdateDragger() {
  gsap.set(sequenceDragger, {
    x: sequenceTrackLength * tl.progress()
  });
  sequenceTime.html(tl.time().toFixed(2));
}

let sequenceDraggable = new Draggable(sequenceDragger, {
  type: "x",
  bounds: { minX: 0, maxX: sequenceTrackLength },
  trigger: "#sequence .timelineUI-dragger div",
  onDrag: function () {
    tl.progress(this.x / sequenceTrackLength).pause();
  }
})[0];

children.forEach((child, index) => {
  let timelineBar = timelineItems[index];
  let duration = child.duration();
  let startTime = child.startTime();
  let width = (duration / time) * 100;
  let startPosition = (startTime / time) * 100;
  let color = child._targets[0].dataset.color;

  gsap.set(timelineBar, {
    width: `${width}%`,
    marginLeft: `${startPosition}%`,
    backgroundColor: color
  });
});

$("#sequence .play").click(function () {
  if (tl.progress() < 1) {
    tl.play();
  } else {
    tl.restart();
  }
});