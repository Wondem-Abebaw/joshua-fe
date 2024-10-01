import { useState, useEffect } from "react";

export default function InternetConnectionStatus(): JSX.Element | null {
  const [isConnected, setIsConnected] = useState<boolean>(navigator.onLine);

  const [shouldShowAlert, setShouldShowAlert] = useState<boolean>(
    !navigator.onLine
  );

  useEffect(() => {
    const handleOnline = (): void => {
      setIsConnected(true);
      setTimeout(() => {
        setShouldShowAlert(false);
      }, 2000);
    };

    const handleOffline = (): void => {
      setIsConnected(false);
      setShouldShowAlert(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  });

  if (!shouldShowAlert) {
    return null;
  }

  const alertBackgroundColor = isConnected ? "bg-green-500" : "bg-red-500";

  return (
    <div
      id="internet-connection-status"
      className={`fixed w-full ${alertBackgroundColor} bottom-0 left-0 text-center text-white`}
    >
      {isConnected ? "Online" : "No internet"}
    </div>
  );
}
