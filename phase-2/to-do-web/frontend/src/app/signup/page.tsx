import AuthForm from "@/components/auth-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <AuthForm mode="signup" />
    </div>
  );
}
