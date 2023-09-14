import NFTContractInfo from "@/app/NFTContractInfo";

export default function Home({ params }: { params: { contractAddress : string } }) {  
  return (
    <main className="flex min-h-screen flex-col p-4 gap-4 bg-slate-200">
      <NFTContractInfo contractAddress={params.contractAddress} />
    </main>
  );
}
