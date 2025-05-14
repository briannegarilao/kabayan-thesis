import AprioriTable from "./apriori-table/AprioriTable";

export default function Analytics() {
  return (
    <div className="w-screen h-screen text-white bg-[#0d0d0d]">
      {/* create a 2-column flex container */}
      <div className="flex w-full h-full ">
        {/* LEFT column */}
        <div className="w-1/2 h-full flex flex-col border-r">
          {/* top half */}
          <div className="flex-1 bg-red flex items-center justify-center border-b">
            <h1>CHARTS</h1>
          </div>
          {/* bottom half */}
          <div className="flex-1 bg-blue flex items-center justify-center">
            <h1>ABOUT CHARTS</h1>
          </div>
        </div>

        {/* RIGHT column */}
        <div className="w-1/2 h-full flex flex-col">
          {/* top half */}
          <div className="w-full h-[50%] flex-1 flex items-center justify-center border-b">
            <AprioriTable />
          </div>
          {/* bottom half */}
          <div className="w-full h-[50%] flex-1 bg-green flex items-center justify-center">
            <h1>SUGGESTIONS</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
