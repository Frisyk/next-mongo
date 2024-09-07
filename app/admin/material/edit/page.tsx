import { getDetailsM, getMateri } from '@/lib/dal';
import Link from 'next/link';
import Form from './Form';

export default async function Materials
({ searchParams }: {searchParams: { [key: string]: string }
}) {
    const slug = searchParams.path
    const materi = await getDetailsM(slug)
        
    return (
        <Form m={JSON.stringify(materi)} />
    )
 
}
