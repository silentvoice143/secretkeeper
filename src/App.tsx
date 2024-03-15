import React from "react";
import QRCodeGenerator from "./Qrcode";

import "./index.css";

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-red-200 App">
      <div className="w-[400px] max-[700px]:w-full max-[700px]:h-full py-8  bg-[#FFBBBB] flex flex-col items-center relative">
        <h1 className="text-xl">SecretKeeper</h1>
        <QRCodeGenerator />
      </div>
    </div>
  );
};

export default App;
