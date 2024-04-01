import { useEffect } from "react";

function Disclosure({ children }) {
	useEffect(() => {
		let clickedReference = null;
		let clickedReferenceLast = null;
		let num = 0;
		const wrapper = document.getElementsByClassName("disclosure_wrapper");
		const container = document.getElementsByClassName("disclosure_container");
		const scrollHeight = container[0]?.scrollHeight;
		const expandButton = document.getElementById("disclosureButton");
		if (expandButton) {
			expandButton.addEventListener("click", toggleContainer);
		}

		// grab all of the "sup" links that are numbers and add click event listeners
		const supElements = document.querySelectorAll("sup");
		supElements.forEach((supElement) => {
			const innerTextAsNumber = supElement.innerText;
			if (parseInt(innerTextAsNumber, 10)) {
				supElement.addEventListener("click", (e) =>
					referenceClick(e, innerTextAsNumber)
				);
			}
		});

		// grab all of the "return" links in the disclosures and add click event listeners
		const returnElements = document.querySelectorAll(".disclosure_wrapper a > svg");
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
		function referenceClick(e, number) {
			setTimeout(() => {
        const hash = window.location.hash.substring(1);
        const targetElement = document.getElementById(hash);
				clickedReferenceLast = true;
				clickedReference = e.target;
				num = number;
				return;
			}, 50);
		}

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
			wrapper[0].classList.add("short");
			container[0].classList.add("short");
			expandButton.parentNode.removeChild(expandButton);
		}

		// expands & collapses the container and changes the button text
		function toggleContainer() {
			wrapper[0].classList.toggle("expanded");
			container[0].classList.toggle("expanded");
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
		if(document.querySelectorAll('.datatrac-wrapper:not(.datatrac-wrapper__disclosure').length === 0) {
			removeDatatrac();
		}
	}, []);

	return <>{children}</>;
}

export default Disclosure;
