import React, { useState } from "react";

const Tooltip = ({ attribs, children }) => {

	const [showModal, setShowModal] = useState(false);

	const handleClick = () => {
		setShowModal(!showModal);
	};

  if (showModal) {
    document.addEventListener("scroll", ()=>{setShowModal(false)})
  }

	return (
		<>
			<span onClick={handleClick} {...attribs}>
				{children}
			</span>
			{showModal && (
				<div className="cx-container-modal--fixed" onClick={()=>{setShowModal(false)}}>
					<div className="cx-container-modal__modal-bg"></div>
					<div className="cx-container-modal__content">
						{children[1]}
					</div>
				</div>
			)}
		</>
	);
};

export default Tooltip;
