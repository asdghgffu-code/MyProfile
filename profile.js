// Navbar toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.onclick = () => { navLinks.classList.toggle("active"); }

// Typing effect
const text = ["Web Developer","Frontend Developer","JavaScript Learner"];
let i=0,j=0,currentText="",isDeleting=false;
function type(){
  const typingElem=document.getElementById("typing");
  currentText=text[i];
  if(!isDeleting){ typingElem.textContent=currentText.substring(0,j++); typingElem.style.opacity="1"; }
  else{ typingElem.textContent=currentText.substring(0,j--); typingElem.style.opacity="0.6"; }
  if(j==currentText.length){ isDeleting=true; setTimeout(type,1000); return; }
  if(j==0){ isDeleting=false; i++; if(i==text.length)i=0; }
  setTimeout(type,100);
}
type();

// Particles background
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth; canvas.height=window.innerHeight;
let particles=[];
for(let k=0;k<100;k++){ particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*3,dx:(Math.random()-0.5),dy:(Math.random()-0.5)}); }
function draw(){ ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="cyan";ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>canvas.width)p.dx*=-1;if(p.y<0||p.y>canvas.height)p.dy*=-1;}); requestAnimationFrame(draw);}
draw();

// Projects
const projects = [
  {title:"Technical Database",desc:"Website storing technical info.",images:["projects/db1.jpg","projects/db2.jpg","projects/db3.jpg"],demo:"https://YOUR_USERNAME.github.io/technical-database/",git:"https://github.com/YOUR_USERNAME/technical-database"},
  {title:"Calculator",desc:"Simple JavaScript calculator.",images:["projects/calc1.jpg","projects/calc2.jpg"],demo:"https://YOUR_USERNAME.github.io/calculator/",git:"https://github.com/YOUR_USERNAME/calculator"}
];

let currentProject=0,currentImage=0;
const slider=document.getElementById("slider");

function updateSlider(){
  const project=projects[currentProject]; slider.innerHTML="";
  project.images.forEach(src=>{const img=document.createElement("img"); img.src=src; slider.appendChild(img);});
  updateSliderPosition(); updateDots();
}
function updateSliderPosition(){ slider.style.transform=`translateX(-${currentImage*100}%)`; }
function updateDots(){
  const project=projects[currentProject];
  const dotsContainer=document.getElementById("galleryDots"); dotsContainer.innerHTML="";
  for(let i=0;i<project.images.length;i++){const dot=document.createElement("span"); if(i===currentImage) dot.classList.add("active"); dot.onclick=()=>{currentImage=i;updateSliderPosition();updateDots();}; dotsContainer.appendChild(dot);}
}
function showProject(index){ 
  currentProject=index; currentImage=0; 
  const project=projects[index];
  document.getElementById("projectTitle").innerText=project.title;
  document.getElementById("projectDescription").innerText=project.desc;
  document.getElementById("projectDemo").href=project.demo;
  document.getElementById("projectGit").href=project.git;
  document.getElementById("projectModal").style.display="flex";
  updateSlider();
  startAutoplay();
}
function openProjectByIndex(index){ showProject(index); }
function closeProject(){ document.getElementById("projectModal").style.display="none"; stopAutoplay(); }
function nextImage(){ const project=projects[currentProject]; currentImage++; if(currentImage>=project.images.length) currentImage=0; updateSliderPosition(); updateDots();}
function prevImage(){ const project=projects[currentProject]; currentImage--; if(currentImage<0) currentImage=project.images.length-1; updateSliderPosition(); updateDots();}
function nextProject(){ let next=currentProject+1; if(next>=projects.length) next=0; showProject(next);}
function prevProject(){ let prev=currentProject-1; if(prev<0) prev=projects.length-1; showProject(prev);}

// Swipe support
const sliderWrapper=document.querySelector(".slider-wrapper");
let touchStartX=0,touchEndX=0;
sliderWrapper.addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].screenX;},false);
sliderWrapper.addEventListener('touchend',e=>{touchEndX=e.changedTouches[0].screenX;handleSwipe();},false);
function handleSwipe(){ const dist=touchEndX-touchStartX; if(dist>50) prevImage(); else if(dist<-50) nextImage(); }

// Autoplay
let autoplayInterval=null; const autoplayDelay=3000;
function startAutoplay(){ stopAutoplay(); autoplayInterval=setInterval(nextImage,autoplayDelay); }
function stopAutoplay(){ if(autoplayInterval) clearInterval(autoplayInterval); }
sliderWrapper.addEventListener("mouseenter", stopAutoplay);
sliderWrapper.addEventListener("mouseleave", startAutoplay);

// Smooth scroll
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  });
});