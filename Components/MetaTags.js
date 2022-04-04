import Head from "next/head";

export default function MetaTags({ 
    title = 'Los ecualizadores - Grupo #2', 
    description = "Unos histogramas chéveres", 
    }){

    return <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
    </Head>

}