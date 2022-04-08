import Link from "next/link";

export default function Home() {
  return <>
    <div className="page double-team">
      <Link href={"/ecualizar"}>
      <button>
        Ecualizar un histograma
      </button>
      </Link>
      <Link href={"/expandir"}>
      <button>
        Expandir un histograma
      </button>
      </Link>
    </div>
  </>
}
