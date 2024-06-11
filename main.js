(()=>{"use strict";function e(e,t,n,r,o,c){var a=e.querySelector(".places__item.card").cloneNode(!0),u=a.querySelector(".card__image"),i=a.querySelector(".card__title"),s=a.querySelector(".card__delete-button"),l=a.querySelector(".card__like-button"),d=a.querySelector(".card__like-count");return t.owner._id!==c&&s.remove(),u.src=t.link,u.alt="Фотография из коллекции пейзажных фотографии. На фото ".concat(t.name),u.dataset.imageCaption=t.name,i.textContent=t.name,u.addEventListener("click",(function(){n(u)})),s.addEventListener("click",(function(e){r(e,t._id)})),t.likes.some((function(e){return e._id===c}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(e){o(e,t._id,d)})),d.textContent=t.likes.length||"",a}function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function r(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function o(e){e.target.classList.contains("popup_is-opened")&&n(e.target)}function c(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity("");var r=e.querySelector(".".concat(t.id,"-error"));t.validity.valid?a(t,r,n):function(e,t,n,r){e.classList.add(r.inputErrorClass),n.textContent=t,n.classList.add(r.errorClass)}(t,t.validationMessage,r,n)}function a(e,t,n){e.classList.remove(n.inputErrorClass),t.textContent="",t.classList.remove(n.errorClass)}function u(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}function i(e,t){t.formSelector;var n=t.inputSelector,r=t.submitButtonSelector,o=t.inactiveButtonClass,i=t.inputErrorClass,s=t.errorClass,l=Array.from(e.querySelectorAll(n)),d=e.querySelector(r);l.forEach((function(t){var n=e.querySelector(".".concat(t.id,"-error"));c(e,t,{inputErrorClass:i,errorClass:s}),a(t,n,{inputErrorClass:i,errorClass:s})})),u(l,d,o)}var s={baseUrl:"https://nomoreparties.co/v1/wff-cohort-16",headers:{authorization:"0ddfb11a-0000-455a-b938-17fd92a7c5cc","Content-Type":"application/json"}},l=function(){return fetch("".concat(s.baseUrl,"/users/me"),{headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},d=function(e){var t=e.name,n=e.link;return fetch("".concat(s.baseUrl,"/cards"),{method:"POST",headers:s.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))};function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(e,t)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var _=document.querySelector("#card-template").content,m=document.querySelector(".places__list"),y=document.querySelectorAll(".popup"),v=document.querySelector(".profile__edit-button"),h=document.querySelector(".popup_type_edit"),S=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_new-card"),C=document.forms["edit-profile"],g=C.querySelector(".popup__input_type_name"),k=C.querySelector(".popup__input_type_description"),q=document.querySelector(".profile__image"),E=document.querySelector(".popup_type_update-avatar"),L=document.forms["update-avatar"],j=L.querySelector(".popup__input_type_avatar-url"),x=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),P=function(e,t){e.target.closest(".places__item.card").remove(),function(e){fetch("".concat(s.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t)},w=function(e,t,n){e.target.classList.contains("card__like-button_is-active")?(e.target.classList.remove("card__like-button_is-active"),function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(e){n.textContent=e.likes.length||""})).catch((function(e){return console.log(e)}))):(e.target.classList.add("card__like-button_is-active"),function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(e){n.textContent=e.likes.length||""})).catch((function(e){return console.log(e)})))};Promise.all([l(),fetch("".concat(s.baseUrl,"/cards"),{headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(t){var n=p(t,2),r=n[0],o=n[1];q.style.backgroundImage="url(".concat(r.avatar,")"),x.textContent=r.name,A.textContent=r.about,o.forEach((function(t){m.append(e(_,t,G,P,w,r._id))}))})).catch((function(e){return console.log(e)})),g.value=x.textContent,k.value=A.textContent;var U,O,T,B,D,I,M,N=document.forms["new-place"],J=N.querySelector(".popup__input_type_card-name"),H=N.querySelector(".popup__input_type_url"),V=document.querySelector(".popup_type_image"),z=document.querySelector(".popup__image"),$=document.querySelector(".popup__caption"),F={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function G(e){z.src=e.src,z.alt=e.alt,$.textContent=e.dataset.imageCaption,t(V)}O=(U=F).formSelector,T=U.inputSelector,B=U.submitButtonSelector,D=U.inactiveButtonClass,I=U.inputErrorClass,M=U.errorClass,Array.from(document.querySelectorAll(O)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()}));var t=Array.from(e.querySelectorAll(T)),n=e.querySelector(B);u(t,n,D),t.forEach((function(r){r.addEventListener("input",(function(){c(e,r,{inputErrorClass:I,errorClass:M}),u(t,n,D)}))}))})),C.addEventListener("submit",(function(e){var t,r;e.preventDefault(),C.querySelector(".popup__button").textContent="Сохранение...",(t=g.value,r=k.value,fetch("".concat(s.baseUrl,"/users/me"),{method:"PATCH",headers:s.headers,body:JSON.stringify({name:t,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){x.textContent=g.value,A.textContent=k.value,n(h)})).catch((function(e){return console.log(e)}))})),N.addEventListener("submit",(function(t){t.preventDefault();var r={name:J.value,link:H.value};N.querySelector(".popup__button").textContent="Сохранение...",Promise.all([l(),d(r)]).then((function(t){var r=p(t,2),o=r[0],c=r[1];m.prepend(e(_,c,G,P,w,o._id)),N.reset(),i(N,F),n(b)})).catch((function(e){return console.log(e)}))})),v.addEventListener("click",(function(){g.value=x.textContent,k.value=A.textContent,i(C,F),t(h)})),S.addEventListener("click",(function(){t(b)})),q.addEventListener("click",(function(e){t(E)})),L.addEventListener("submit",(function(e){var t;e.preventDefault(),L.querySelector(".popup__button").textContent="Сохранение...",(t=j.value,fetch("".concat(s.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){q.style.backgroundImage="url(".concat(j.value,")"),L.reset(),i(L,F),n(E)})).catch((function(e){return console.log(e)}))})),y.forEach((function(e){e.addEventListener("click",(function(t){t.target.classList.contains("popup__close")&&n(e)})),e.addEventListener("mousedown",o)}))})();