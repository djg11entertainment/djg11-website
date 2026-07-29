const header=document.querySelector(".site-header");
const menuBtn=document.querySelector(".menu-btn");
const nav=document.querySelector("#mainNav");
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",window.scrollY>20));
menuBtn.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",String(open))});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuBtn.setAttribute("aria-expanded","false")}));
document.querySelector("#year").textContent=new Date().getFullYear();

const availabilityDate=document.querySelector("#availabilityDate");
const checkDate=document.querySelector("#checkDate");
const result=document.querySelector("#availabilityResult");
const continueQuote=document.querySelector("#continueQuote");
const quoteDate=document.querySelector("#quoteDate");
const unavailable=window.DJG11_UNAVAILABLE_DATES||[];

function formatDate(value){
  return new Intl.DateTimeFormat("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",timeZone:"UTC"}).format(new Date(value+"T00:00:00Z"));
}
checkDate.addEventListener("click",()=>{
  const value=availabilityDate.value;
  result.className="availability-result";
  continueQuote.classList.add("hidden");
  if(!value){result.textContent="Please select an event date.";return}
  if(unavailable.includes(value)){
    result.classList.add("bad");
    result.textContent=`${formatDate(value)} is currently marked unavailable. Send an inquiry for nearby dates.`;
  }else{
    result.classList.add("good");
    result.textContent=`${formatDate(value)} is not currently marked booked. Submit your request so DJ G11 can confirm it.`;
    quoteDate.value=value;
    continueQuote.classList.remove("hidden");
  }
});

const galleryItems=document.querySelectorAll(".gallery-item");
const lightbox=document.querySelector("#lightbox");
const lightboxImg=lightbox.querySelector("img");
galleryItems.forEach(item=>item.addEventListener("click",()=>{
  const img=item.querySelector("img");
  lightboxImg.src=img.src;lightboxImg.alt=img.alt;
  lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");
}));
function closeLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true")}
lightbox.querySelector("button").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox()});

const form=document.querySelector("#quoteForm");
const formStatus=document.querySelector("#formStatus");
form.addEventListener("submit",e=>{
  if(form.action.includes("YOUR-BOOKING-EMAIL")){
    e.preventDefault();
    formStatus.textContent="Before this form can send automatically, replace YOUR-BOOKING-EMAIL in index.html with your real email address.";
    formStatus.style.color="#ffd75a";
  }
});