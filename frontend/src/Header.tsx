

export default function Header() {

  return (
    <div className="bg-black w-screen flex flex-row justify-center relative">
      <div className="text-white text-center absolute"> Direct Messages </div>
      <div className="ml-auto">
        <i className="fa-solid fa-envelope-open text-gray-400"></i>
        <i className="fa-solid fa-question text-gray-500"></i>
      </div>
    <div class="flex items-center gap-2">
      <div class="w-5 h-5 bg-gray-400 rounded-full"></div> 
      <span class="font-semibold text-sm">Direct Messages</span>
    </div>

    <div class="flex items-center gap-3">
      <div class="w-6 h-6 bg-[#2b2d31] rounded-md"></div>
      <div class="w-6 h-6 bg-[#2b2d31] rounded-md"></div> 
    </div>
    </div>
  );
}
