export const instant = false;

export function generateStaticParams() {
  return [
    { requestId: "10001" },
    { requestId: "10002" },
    { requestId: "10003" },
    { requestId: "10004" },
    { requestId: "10005" },
    { requestId: "10006" },
    { requestId: "10007" },
  ];
}

export default function RequestorBidsPage() {
  return (
    <div>
      <h1>Request Submitted Bids</h1>
    </div>
  );
}

