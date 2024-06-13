(()=>{"use strict";function e(e,t,n,r,o,a){var c=e.querySelector(".places__item.card").cloneNode(!0),u=c.querySelector(".card__image"),i=c.querySelector(".card__title"),l=c.querySelector(".card__delete-button"),s=c.querySelector(".card__like-button"),d=c.querySelector(".card__like-count"),p=t._id;return u.src=t.link,u.alt="Фотография из коллекции пейзажных фотографии. На фото ".concat(t.name),u.dataset.imageCaption=t.name,i.textContent=t.name,d.textContent=t.likes.length||"",t.likes.some((function(e){return e._id===a}))&&s.classList.add("card__like-button_is-active"),u.addEventListener("click",(function(){n(u)})),t.owner._id!==a?l.remove():l.addEventListener("click",(function(e){r(p).then((function(){evt.target.closest(".places__item.card").remove()})).catch((function(e){return console.log(e)}))})),s.addEventListener("click",(function(e){o(e,p).then((function(t){e.target.classList.toggle("card__like-button_is-active"),d.textContent=t.likes.length||""})).catch((function(e){return console.log(e)}))})),c}function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function r(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function o(e){e.target.classList.contains("popup_is-opened")&&n(e.target)}function a(e,t,n){e.classList.remove(n.inputErrorClass),t.textContent="",t.classList.remove(n.errorClass)}function c(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}function u(e,t){var n=t.inputSelector,r=t.submitButtonSelector,o=t.inactiveButtonClass,u=t.inputErrorClass,i=t.errorClass,l=Array.from(e.querySelectorAll(n)),s=e.querySelector(r);l.forEach((function(t){t.setCustomValidity(""),a(t,e.querySelector(".".concat(t.id,"-error")),{inputErrorClass:u,errorClass:i})})),c(l,s,o)}var i={baseUrl:"https://nomoreparties.co/v1/wff-cohort-16",headers:{authorization:"0ddfb11a-0000-455a-b938-17fd92a7c5cc","Content-Type":"application/json"}},l=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},s=function(e){return fetch("".concat(i.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:i.headers}).then(l)};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p,f=document.querySelector("#card-template").content,_=document.querySelector(".places__list"),m=document.querySelectorAll(".popup"),y=document.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_edit"),h=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_new-card"),S=document.forms["edit-profile"],C=S.querySelector(".popup__input_type_name"),g=S.querySelector(".popup__input_type_description"),q=document.querySelector(".profile__image"),E=document.querySelector(".popup_type_update-avatar"),L=document.forms["update-avatar"],k=L.querySelector(".popup__input_type_avatar-url"),x=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),w=document.forms["new-place"],U=w.querySelector(".popup__input_type_card-name"),j=w.querySelector(".popup__input_type_url"),O=document.querySelector(".popup_type_image"),T=document.querySelector(".popup__image"),B=document.querySelector(".popup__caption"),D=function(e,t){return e.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:i.headers}).then(l)}(t):function(e){return fetch("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:i.headers}).then(l)}(t)},P=function(e){T.src=e.src,T.alt=e.alt,B.textContent=e.dataset.imageCaption,t(O)};Promise.all([fetch("".concat(i.baseUrl,"/users/me"),{headers:i.headers}).then(l),fetch("".concat(i.baseUrl,"/cards"),{headers:i.headers}).then(l)]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,u=[],i=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=a.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return u}}(n,r)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[0],c=o[1];p=a._id,q.style.backgroundImage="url(".concat(a.avatar,")"),x.textContent=a.name,A.textContent=a.about,c.forEach((function(t){_.append(e(f,t,P,s,D,p))}))})).catch((function(e){return console.log(e)})),L.addEventListener("submit",(function(e){e.preventDefault();var t,r=L.querySelector(".popup__button");r.textContent="Сохранение...",(t=k.value,fetch("".concat(i.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:t})}).then(l)).then((function(e){q.style.backgroundImage="url(".concat(e.avatar,")"),L.reset(),u(L,$),n(E)})).catch((function(e){return console.log(e)})).finally((function(){return r.textContent="Сохранить"}))})),S.addEventListener("submit",(function(e){e.preventDefault();var t,r,o=S.querySelector(".popup__button");o.textContent="Сохранение...",(t=C.value,r=g.value,fetch("".concat(i.baseUrl,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify({name:t,about:r})}).then(l)).then((function(e){x.textContent=e.name,A.textContent=e.about,n(v)})).catch((function(e){return console.log(e)})).finally((function(){return o.textContent="Сохранить"}))})),w.addEventListener("submit",(function(t){t.preventDefault();var r,o,a,c={name:U.value,link:j.value},d=w.querySelector(".popup__button");d.textContent="Сохранение...",(r=c,o=r.name,a=r.link,fetch("".concat(i.baseUrl,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify({name:o,link:a})}).then(l)).then((function(t){_.prepend(e(f,t,P,s,D,p)),w.reset(),u(w,$),n(b)})).catch((function(e){return console.log(e)})).finally((function(){d.textContent="Сохранить"}))})),q.addEventListener("click",(function(e){t(E)})),y.addEventListener("click",(function(){C.value=x.textContent,g.value=A.textContent,u(S,$),t(v)})),h.addEventListener("click",(function(){t(b)})),m.forEach((function(e){e.addEventListener("click",(function(t){t.target.classList.contains("popup__close")&&n(e)})),e.addEventListener("mousedown",o)}));var I,M,N,J,V,H,z,$={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};M=(I=$).formSelector,N=I.inputSelector,J=I.submitButtonSelector,V=I.inactiveButtonClass,H=I.inputErrorClass,z=I.errorClass,Array.from(document.querySelectorAll(M)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()}));var t=Array.from(e.querySelectorAll(N)),n=e.querySelector(J);c(t,n,V),t.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity("");var r=e.querySelector(".".concat(t.id,"-error"));t.validity.valid?a(t,r,n):function(e,t,n,r){e.classList.add(r.inputErrorClass),n.textContent=t,n.classList.add(r.errorClass)}(t,t.validationMessage,r,n)}(e,r,{inputErrorClass:H,errorClass:z}),c(t,n,V)}))}))}))})();