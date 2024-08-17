import { getDetailsM, getMateri } from '@/lib/dal';
import Link from 'next/link';
import Form from './Form';

export default async function Materials
({ searchParams }: {searchParams: { [key: string]: string }
}) {
    const id = searchParams.path
    const materi = await getDetailsM(id)
    console.log(searchParams);
    
    return (
        <Form m={JSON.stringify(materi)} />
    )
 
}
