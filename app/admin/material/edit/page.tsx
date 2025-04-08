import { getMaterialById } from '@/lib/admin/materialAdmin';
import Form from './Form';
import { redirect } from 'next/navigation';

export default async function EditMaterialPage (
    { searchParams }: { searchParams: { [key: string]: string } }
) {
    const materialId = searchParams.id;

    if (!materialId) {
        console.error("Material ID is missing");
        return redirect('/admin/material?error=MissingID');
    }

    const result = await getMaterialById(materialId);
        
    if (!result.success || !result.data) {
        console.error("Error fetching material:", result.error);
        return redirect(`/admin/material?error=${result.error || 'NotFound'}`);
    }
    
    return (
        <Form m={JSON.stringify(result.data)} />
    );
}
