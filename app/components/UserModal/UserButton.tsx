"use client";

import { useState } from "react";
import LoginModal from "./LoginModal";
import { XIcon } from "lucide-react";
import { Button } from "../ui/Button/Button";

export default function UserButton() {
  const [isLogged, setIsLogged] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  function openLoginModal() {
    setShowLogin(true);
  }

  function closeLoginModal() {
    setShowLogin(false);
  }

  return (
    <>
      <div>
        <Button onClick={openLoginModal} size="fit" className="text-xl">Login</Button>
        {showLogin && <LoginModal onClose={closeLoginModal} />}
      </div>
    </>
  );
}
