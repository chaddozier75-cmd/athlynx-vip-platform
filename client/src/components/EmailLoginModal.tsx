import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, KeyRound, CheckCircle, Sparkles } from "lucide-react";

interface EmailLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EmailLoginModal({ open, onOpenChange }: EmailLoginModalProps) {
  const [step, setStep] = useState<"email" | "code" | "success">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [devCode, setDevCode] = useState("");
  const [greeting, setGreeting] = useState("");

  const sendCodeMutation = trpc.emailAuth.sendCode.useMutation({
    onSuccess: (data) => {
      setStep("code");
      setError("");
      if (data.devCode) {
        setDevCode(data.devCode);
      }
      if (data.greeting) {
        setGreeting(data.greeting);
      }
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const verifyCodeMutation = trpc.emailAuth.verifyCode.useMutation({
    onSuccess: (data) => {
      setStep("success");
      setError("");
      if (data.greeting) {
        setGreeting(data.greeting);
      }
      // Reload after short delay to show success
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError("");
    sendCodeMutation.mutate({ email });
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }
    setError("");
    verifyCodeMutation.mutate({ email, code });
  };

  const resetModal = () => {
    setStep("email");
    setEmail("");
    setCode("");
    setError("");
    setDevCode("");
    setGreeting("");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetModal();
      onOpenChange(isOpen);
    }}>
      <DialogContent className="bg-[#0a1628] border border-cyan-500/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-bold text-cyan-400">ATHLYNX</div>
              <div className="text-xs text-yellow-400 tracking-widest">THE ATHLETE'S PLAYBOOK</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {step === "email" && (
          <form onSubmit={handleSendCode} className="space-y-4 mt-4">
            <div className="text-center text-gray-300 mb-4">
              Enter your email to receive a login code
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <Button
              type="submit"
              disabled={sendCodeMutation.isPending || !email}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold"
            >
              {sendCodeMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Login Code"
              )}
            </Button>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={handleVerifyCode} className="space-y-4 mt-4">
            {/* Personalized Greeting */}
            {greeting && (
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-3 text-center animate-pulse">
                <Sparkles className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <p className="text-cyan-300 font-bold">{greeting}</p>
              </div>
            )}
            
            <div className="text-center text-gray-300 mb-2">
              Enter the 6-digit code for<br />
              <span className="text-cyan-400 font-semibold">{email}</span>
            </div>
            
            {/* Code Display - Always Visible */}
            {devCode && (
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-lg p-4 text-center">
                <p className="text-green-400 text-xs mb-2 font-bold uppercase tracking-wider">🔐 Your Login Code</p>
                <p className="text-green-300 font-mono text-3xl tracking-[0.5em] font-bold">{devCode}</p>
                <p className="text-green-400/60 text-xs mt-2">Enter this code below</p>
              </div>
            )}
            
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <Input
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="pl-10 bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 text-center text-2xl tracking-widest font-mono"
                maxLength={6}
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <Button
              type="submit"
              disabled={verifyCodeMutation.isPending || code.length !== 6}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold"
            >
              {verifyCodeMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify & Login"
              )}
            </Button>
            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full text-gray-400 hover:text-cyan-400 text-sm"
            >
              Use a different email
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
            <div className="text-xl font-bold text-green-400">Login Successful! 🎉</div>
            {greeting && (
              <div className="text-cyan-300 font-semibold">{greeting}</div>
            )}
            <div className="text-gray-300">Redirecting to dashboard...</div>
            <Loader2 className="w-6 h-6 text-cyan-400 mx-auto animate-spin" />
            <p className="text-yellow-400/60 text-xs italic">"Never ever give up."</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
