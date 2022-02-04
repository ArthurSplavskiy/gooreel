// Подключение дополнения
import "../../libs/hystmodal.min.js";
// Подключение стилей
// import "../../../scss/libs/_hystmodal.scss";

// Импорт зависимостей
// import { getHash, setHash } from "./functions.js";

// * Using
{/* <a href="#" data-hystmodal="[data-popup='myPopupCallback']">Popup Open</a> */}

{/* <div class="hystmodal" data-popup="myPopupCallback">
    <div class="hystmodal__wrap">
        <div class="hystmodal__window" role="dialog" aria-modal="true">
            <button data-hystclose class="hystmodal__close">Закрыть</button>
        </div>
    </div>
</div> */}


export let popupItem;
export function initPopups() {
	popupItem = new HystModal({
		linkAttributeName: "data-popup-link",
		waitTransitions: true,
		// beforeOpen: function (popupItem) {
		// 	const hash = popupItem.openedWindow.id;
		// 	setHash(`#${hash}`);
		// },
		// afterClose: function (popupItem) {
		// 	setHash(window.location.href.split('#')[0]);
		// },
		// прочие настройки (не обязательно), см. API
	});
	// Открытие по хешу
	// if (getHash() && document.querySelector(`#${getHash()}`)) {
	// 	popupItem.open(`#${getHash()}`);
	// }
}
initPopups();