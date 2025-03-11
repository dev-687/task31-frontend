import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate(); 

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-2xl font-bold mb-6">Welcome</h2>
                <div className="space-y-4">
                    <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                        onClick={() => navigate("/login")}>
                        Login
                    </button>
                    <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                        onClick={() => navigate("/register")}>
                        Register
                    </button>
                    <button className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
                        onClick={() => navigate("/dashboard")}>
                        Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
