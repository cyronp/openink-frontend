"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import { Button } from "../ui/Button/Button";
import { checkAuth, logout } from "@/app/utils/auth";
import ExportTokenModal from "./ExportTokenModal";
import { ChevronDown, LogOut, Key } from "lucide-react";

export default function UserButton() {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initAuth() {
      const auth = await checkAuth();
      setIsLogged(auth.loggedIn);
      if (auth.token) {
        setToken(auth.token);
      }

      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("loginRequired") === "true") {
        setLoginMessage("Você precisa fazer login antes de acessar a página de escrita.");
        setShowLogin(true);

        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
    initAuth();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function openLoginModal() {
    setLoginMessage(null);
    setShowLogin(true);
  }

  function closeLoginModal() {
    setShowLogin(false);
  }

  function handleEscrevaClick() {
    setLoginMessage("Você precisa fazer login antes de acessar a página de escrita.");
    setShowLogin(true);
  }

  function openTokenModal() {
    setShowTokenModal(true);
  }

  function closeTokenModal() {
    setShowTokenModal(false);
  }

  async function handleLogout() {
    const res = await logout();
    if (res.success) {
      setIsLogged(false);
      setToken(null);
      window.location.reload();
    }
  }

  return (
    <div className="flex items-center gap-4">
      {isLogged ? (
        <>
          <Button size="fit" className="text-xl" asChild>
            <Link href="/write">ESCREVA</Link>
          </Button>
          
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              size="fit"
              className="text-xl flex items-center gap-1 cursor-pointer"
            >
              Conta <ChevronDown size={20} />
            </Button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded overflow-hidden z-50 flex flex-col">
                <Button
                  onClick={() => {
                    openTokenModal();
                    setIsDropdownOpen(false);
                  }}
                >
                  Salvar Token
                </Button>
                <div className="h-px bg-gray-200 w-full" />
                <Button
                  onClick={() => {
                    handleLogout();
                    setIsDropdownOpen(false);
                  }}
                  className="text-red-500"
                >
                  Sair
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Button onClick={handleEscrevaClick} size="fit" className="text-xl">
            ESCREVA
          </Button>
          <Button onClick={openLoginModal} size="fit" className="text-xl">
            Login
          </Button>
        </>
      )}
      {showLogin && <LoginModal onClose={closeLoginModal} message={loginMessage} />}
      {showTokenModal && <ExportTokenModal token={token || ""} onClose={closeTokenModal} />}
    </div>
  );
}

