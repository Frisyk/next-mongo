import { getPosts } from "@/lib/action"
import exp from "constants"
import Image from "next/image"

const DashboardPage = async() => {
    const posts = await getPosts()
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.desc}</p>
                    <Image src={post.img} width={1000} height={1000} alt={post.title} />
                </div>
            ))}
        </div>
    )
}

export default DashboardPage;