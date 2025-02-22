'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Image,
} from "@heroui/react";

interface ImageWithModalProps {
  src: string;
  originalSrc?: string;
  alt: string;
  className?: string;
}

const ImageWithModal: React.FC<ImageWithModalProps> = ({
  src,
  originalSrc,
  alt,
  className
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // ใช้ originalSrc ถ้ามี ถ้าไม่มีให้ใช้ src
  const modalSrc = originalSrc || src;

  return (
    <>
      <Image
        src={src}
        alt={alt}
        className={`cursor-pointer ${className}`}
        onClick={onOpen}
      />

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        hideCloseButton
        classNames={{
          body: "p-0",
        }}
        backdrop='blur'
        placement='auto'
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalBody className='p-2'>
                <div className="relative">
                  <Image
                    src={modalSrc}
                    alt={alt}
                    className="w-full h-auto"
                  />
                  <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <Button
                      isIconOnly
                      radius='full'
                      color="danger"
                      onPress={onClose}
                      className="bg-zinc-500/50 backdrop-blur-sm hover:bg-zinc-500/70 text-white"
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageWithModal;