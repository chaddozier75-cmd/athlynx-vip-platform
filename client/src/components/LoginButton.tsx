import { useState } from "react";
import EmailLoginModal from "./EmailLoginModal";
import { Button } from "./ui/button";

interface LoginButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

export default function LoginButton({ 
  className = "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg shadow-cyan-500/30 transition-all",
  variant,
  size,
  children = "LOGIN"
}: LoginButtonProps) {
  const [showLogin, setShowLogin] = useState(false);
  
  return (
    <>
      {variant ? (
        <Button 
          onClick={() => setShowLogin(true)}
          variant={variant}
          size={size}
          className={className}
        >
          {children}
        </Button>
      ) : (
        <button 
          onClick={() => setShowLogin(true)}
          className={className}
        >
          {children}
        </button>
      )}
      <EmailLoginModal open={showLogin} onOpenChange={setShowLogin} />
    </>
  );
}

// Export a hook for programmatic login modal control
export function useLoginModal() {
  const [showLogin, setShowLogin] = useState(false);
  
  return {
    showLogin,
    openLogin: () => setShowLogin(true),
    closeLogin: () => setShowLogin(false),
    LoginModal: () => <EmailLoginModal open={showLogin} onOpenChange={setShowLogin} />
  };
}
