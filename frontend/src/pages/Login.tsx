import { useState } from "react";
import { api } from "../api";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await api.login(username, password);
      } else {
        await api.register(username, password);
        await api.login(username, password);
      }
      window.location.href = "/";
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="bg-card p-8 rounded-2xl w-96">
        <h1 className="text-2xl font-bold text-center mb-6">LinkBox</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-sidebar text-white border-none"
            required
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-sidebar text-white border-none"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full p-3 rounded-lg bg-accent text-bg font-bold">
            {isLogin ? "登录" : "注册"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          {isLogin ? "没有账号？" : "已有账号？"}
          <button onClick={() => setIsLogin(!isLogin)} className="text-accent ml-1">
            {isLogin ? "注册" : "登录"}
          </button>
        </p>
      </div>
    </div>
  );
}