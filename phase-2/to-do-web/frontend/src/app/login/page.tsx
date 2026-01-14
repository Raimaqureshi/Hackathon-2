import AuthForm from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
