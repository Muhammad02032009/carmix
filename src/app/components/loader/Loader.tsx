import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader className="w-12 h-12 text-blue-500 animate-spin" />
    </div>
  );
}
