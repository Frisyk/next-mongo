import Link from "next/link";

export default function Page({ params} : {params: any}) {
    return (
    <div>My Post: [params]
      <Link href={'/dashboard'}>Back</Link>
    </div>

    )
  }