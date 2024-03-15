import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Icon } from "@iconify/react";
import * as htmlToImage from "html-to-image";

const QRCodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [qrData, setQRData] = useState("");
  const [IsQrcode, setIsQrcode] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const qrRef = useRef(null);

  const generateQRCode = () => {
    // Generate your QR code data here, for example:
    setIsQrcode(true);
    setQRData(inputValue);
  };

  const downloadQRCode = async () => {
    if (!qrRef.current) return;

    const dataUrl = await htmlToImage.toPng(qrRef.current, {
      quality: 1,
      // width: qrRef.current.offsetWidth * 2,
      // height: qrRef.current.offsetHeight * 2,
    });

    // download image
    const link = document.createElement("a");
    link.download = "html-to-img.png";
    link.href = dataUrl;
    link.click();
  };

  const shareQRCode = () => {
    if (!qrRef.current) return;
    // Fallback for sharing via WhatsApp

    htmlToImage.toBlob(qrRef.current).then(function (blob) {
      if (!blob) return;
      const filesArray = [
        new File([blob], "qrcode.png", { type: "image/png" }),
      ];
      if (navigator.share) {
        navigator
          .share({
            files: filesArray,
            title: "QR Code",
            text: "Scan this QR code",
          })
          .then(() => console.log("Shared successfully"))
          .catch((error) => console.error("Error sharing:", error));
      } else {
        // console.log("Web Share API not supported");
        const whatsappURL = `whatsapp://send?text=Scan this QR code&files=${encodeURIComponent(
          blob
        )}`;

        // Fallback for sharing via email
        const emailBody = "Scan this QR code";
        const emailSubject = "QR Code";
        const emailURL = `mailto:?subject=${encodeURIComponent(
          emailSubject
        )}&body=${encodeURIComponent(emailBody)}`;
        // Open a new window to trigger the default email client
        window.open(emailURL);
        // Open WhatsApp if the device supports it
        window.location.href = whatsappURL;
      }
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center flex-1 w-full p-4">
      <input
        className="w-full p-4 border-none outline-none"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter text for QR code"
      />
      <button
        className="px-4 py-2 my-4 bg-white border-none outline-none"
        onClick={generateQRCode}
      >
        Generate QRCode
      </button>
      {IsQrcode && (
        <div className="flex justify-between w-full my-4 ">
          <div className="qrcode">
            <QRCode
              style={{
                background: "white",

                border: "2px solid black", // Set border style
                padding: "10px", // Add some padding for better appearance
                display: "inline-block", // Ensure the container wraps QR code
              }}
              ref={qrRef}
              className="w-[150px] h-[150px] rounded-md"
              value={qrData}
            />
          </div>
          <div className="flex items-center justify-center buttons">
            <button
              className="p-2 mx-4 bg-white rounded-full download"
              onClick={downloadQRCode}
            >
              <Icon
                className="w-10 h-10"
                icon="material-symbols:download-sharp"
              />
            </button>
            <button
              className="p-2 mx-4 bg-white rounded-full send"
              onClick={shareQRCode}
            >
              <Icon className="w-10 h-10" icon="bitcoin-icons:share-filled" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
