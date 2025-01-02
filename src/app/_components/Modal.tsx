"use client";

import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, ReactNode } from "react";
import ReactModal from "react-modal";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className: string;
};

export const Modal: FC<Props> = ({ isOpen, onClose, className, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={className}
      ariaHideApp={false}
    >
      <div className="flex justify-end">
        <button onClick={onClose}>
          <FontAwesomeIcon icon={faXmarkCircle} className="" />
        </button>
      </div>
      {children}
    </ReactModal>
  );
};
