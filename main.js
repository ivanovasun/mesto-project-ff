(()=>{"use strict";function e(e,t){var n=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),r=n.querySelector(".card__delete-button");n.querySelector(".card__title").textContent=e.name;var o=n.querySelector(".card__image");return o.setAttribute("src",e.link),o.setAttribute("alt",e.name),r.addEventListener("click",t.del),n.addEventListener("click",t.like),o.addEventListener("click",t.popupwork),n}var t=function(e){var t=document.querySelector(".popup_is-opened");("Escape"===e.key||e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&o(t)},n=function(e){e.classList.remove("popup_is-animated")},r=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",t),e.addEventListener("mousedown",t),e.addEventListener("click",t)},o=function(e){setTimeout(n,600,e),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",t),e.removeEventListener("mousedown",t),e.removeEventListener("click",t)};function c(e){setTimeout(r,600,e),function(e){e.classList.add("popup_is-animated")}(e)}var p=document.querySelector(".places").querySelector(".places__list"),a=document.querySelector(".popup_type_edit"),i=document.querySelector(".popup_type_new-card"),s=document.querySelector(".popup_type_image"),u=s.querySelector(".popup__image"),d=s.querySelector(".popup__caption"),l=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__add-button"),m=document.querySelector(".profile__info"),y=m.querySelector(".profile__title"),v=m.querySelector(".profile__description"),f=document.querySelector("form[name=edit-profile]"),k=f.querySelector(".popup__input_type_name"),q=f.querySelector(".popup__input_type_description"),S=document.querySelector("form[name=new-place]"),L={del:function(e){e.target.closest(".card").remove()},like:function(e){e.target.classList.contains("card__like-button")&&e.target.classList.toggle("card__like-button_is-active")},popupwork:function(e){c(s),u.setAttribute("src",e.target.src),u.setAttribute("alt",e.target.alt),d.textContent=e.target.alt}};[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(t){var n=e(t,L);p.append(n)})),l.addEventListener("click",(function(){c(a),k.value=y.textContent,q.value=v.textContent})),f.addEventListener("submit",(function(e){e.preventDefault(),y.textContent=k.value,v.textContent=q.value,o(a)})),_.addEventListener("click",(function(){c(i)})),S.addEventListener("submit",(function(t){t.preventDefault();var n={name:S.querySelector(".popup__input_type_card-name").value,link:S.querySelector(".popup__input_type_url").value};p.prepend(e(n,L)),o(i),S.reset()}))})();