import { attributesToProps } from "html-react-parser";
import { useEffect, useRef } from "react";

function Disclosure({ attribs, children }) {
	let disclosureWrapper = useRef(null);
	useEffect(() => {
		if(document.querySelectorAll('.datatrac-wrapper:not(.datatrac-wrapper__disclosure').length === 0) {
			removeDatatrac();
		}
		let clickedReference = null;
		let clickedReferenceLast = null;
		let num = 0;
		const wrapper = disclosureWrapper.current.querySelector(".disclosure_wrapper");
		const container = disclosureWrapper.current.querySelector(".disclosure_container");
		const scrollHeight = container.scrollHeight;
		const expandButton = disclosureWrapper.current.querySelector("#disclosureButton");
		if (expandButton) {
			expandButton.addEventListener("click", toggleContainer);
		}

		// grab all of the "return" links in the disclosures and add click event listeners
		const returnElements = disclosureWrapper.current.querySelectorAll(".disclosure_wrapper a > svg");
		returnElements.forEach((returnElement) => {
			let ancestorElement = returnElement.parentElement;
			let id;
			let numberFromId;
			while (ancestorElement && !ancestorElement.id?.includes('disclosure-')) {
				ancestorElement = ancestorElement.parentElement;
				id = ancestorElement.id;
				numberFromId = id.split('-')[1];
			}
			returnElement.addEventListener("click", (e) =>
				returnClick(e, numberFromId)
			);
		});

		// when the user clicks the reference/superscript link
		// function referenceClick(e, number) {
		// 	setTimeout(() => {
        // const hash = window.location.hash.substring(1);
        // const targetElement = document.getElementById(hash);
		// 		clickedReferenceLast = true;
		// 		clickedReference = e.target;
		// 		num = number;
		// 		return;
		// 	}, 50);
		// }

		// when the user clicks the 'return' arrow in the disclosure
		function returnClick(e, numberFromId) {
			if (clickedReferenceLast && numberFromId == num) {
				e.preventDefault();
				clickedReference.scrollIntoView();
				clickedReference.focus();
				return;
			}
			return;
		}

		// Show a collapsed container with no "expand" button if not enough content within
		if (scrollHeight < 175) {
			wrapper.classList.add("short");
			container.classList.add("short");
			expandButton.remove();
			// expandButton.parentNode.removeChild(expandButton);
		}

		// expands & collapses the container and changes the button text
		function toggleContainer() {
			wrapper.classList.toggle("expanded");
			container.classList.toggle("expanded");
			expandButton.innerHTML = expandButton.innerHTML === "+ Expand" ? "- Collapse" : "+ Expand";
		}
		function removeDatatrac () {
			Array.prototype.forEach.call(document.querySelectorAll('.datatrac-wrapper:not(.datatrac-wrapper__disclosure'), function(element) {
				element.closest('.cx-section').remove();
			});
			Array.prototype.forEach.call(document.querySelectorAll('.datatrac-wrapper__disclosure'), function(element) {
				element.remove();
			});
		}
	}, []);

	return <div {...attributesToProps(attribs)} ref={disclosureWrapper}>{children}</div>;
}

export default Disclosure;
