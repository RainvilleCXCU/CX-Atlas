import { useEffect } from "react";

export interface Props {
	performs: boolean,
    children?
}

function DataTracComparison({ performs, children }: Props) {
	useEffect(() => {
		function removeDatatrac () {
			Array.prototype.forEach.call(document.querySelectorAll('.datatrac-wrapper:not(.datatrac-wrapper__disclosure'), function(element) {
				element.closest('.cx-section').remove();
			});
			Array.prototype.forEach.call(document.querySelectorAll('.datatrac-wrapper__disclosure'), function(element) {
				element.remove();
			});
		}
        if(!performs) {
            removeDatatrac();
        }
	}, []);

	return <>{children}</>;
}

export default DataTracComparison;
